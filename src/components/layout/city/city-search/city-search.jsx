import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import { useState, useRef, useEffect } from 'react';

import useSearch from './use-search';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

import Input from '../../../../components/form/input';
import Modal from '../../../utils/modal';

const onCityClick = (data, setCity, onClose) => {
  const { city, timezone } = data;

  setCity(city);
  localStorage.setItem('city', city);
  localStorage.setItem('timezone', timezone);
  onClose();
};

const CitySearch = ({ onClickClose, setCity }) => {
  const [data, setData] = useState([
    { city: 'Absafa', timezone: 'Ahahahah' },
    { city: 'Absafa', timezone: 'Ahahahah' },
    { city: 'Absafa', timezone: 'Ahahahah' },
  ]);

  const [asyncAction, isLoading, isCancelled] = useAsyncAction();

  const form = useRef();
  const [lastRef, { page, hasMore }, isSearchLoading] = useSearch(form, setData);

  // useEffect
  useEffect(() => {
    const getCities = async () => {
      const config = {
        method: 'get',
        url: `/timezone/city`,
        params: { city: '', page: 0 }, // add city
        accessToken: 'nothing',
      };

      const data = await asyncAction(config);

      if (data && !isCancelled.current) setData(data.cities);
    };

    getCities();
  }, []);

  return (
    <Modal onClickClose={() => onClickClose()}>
      <div className="city-search card">
        {isLoading && <div className="spinner-with-background" />}
        <h2 className="city-search__heading heading">Поиск города</h2>
        <Formik
          innerRef={form}
          initialValues={{ city: '' }}
          onSubmit={async (values, { initialValues }) => {
            const { city } = values;

            const config = {
              method: 'get',
              url: `/timezone/city`,
              params: { city, page }, // add city
              accessToken: 'nothing',
            };

            const data = await asyncAction(config);

            if (data) setData(data.cities);

            hasMore.current = true;
            page.current = 0;
          }}>
          {({ submitForm, handleChange }) => (
            <Form className="city-search__form mb-1">
              <div className="city-search__bar mt-6">
                <label className="label label--primary">Город</label>
                <div className="input--icon">
                  <FontAwesomeIcon className="input__icon" icon="search" />
                  <Input
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                    type="text"
                    className="input ml-2"
                    name="city"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {data.map((cityData, i) =>
          data.length - 1 === i ? (
            <div
              ref={lastRef}
              key={i}
              onClick={() => onCityClick(cityData, setCity, onClickClose)}
              className="city-search__city mt-5">
              {cityData.city}
            </div>
          ) : (
            <div
              key={i}
              onClick={() => onCityClick(cityData, setCity, onClickClose)}
              className="city-search__city mt-5">
              {cityData.city}
            </div>
          )
        )}
      </div>
    </Modal>
  );
};

export default CitySearch;
