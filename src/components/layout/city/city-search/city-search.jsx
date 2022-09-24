import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useScroll from './use-scroll';
import Modal from '../../../base/modal/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import useLoadOnRender from './use-load-on-render';
import CityCard from './city-card';
import CitySearchForm from './city-search-form/city-search-form';

const CitySearch = ({ onClickClose }) => {
  const { city } = useSelector((state) => state.timezone);
  const [data, setData] = useState([]);

  const form = useRef();
  const [lastRef, { page, hasMore }] = useScroll(form, setData);
  const isLoading = useLoadOnRender(setData);

  return (
    <Modal onClickClose={onClickClose}>
      <div className="city-search">
        <ModalHeading
          titleDesktopClassName="city-search__heading"
          title="Выбрать город"
          onClickClose={onClickClose}
        />
        {isLoading && <div className="spinner-with-background" />}
        <div className="current-city">
          <span className="current-city__label">Ваше местоположение</span>
          <span className="current-city__value">{city}</span>
        </div>
        <CitySearchForm setData={setData} page={page} hasMore={hasMore} form={form} />
        {data.map((cityData, i) =>
          data.length - 5 === i ? (
            <CityCard cityData={cityData} cityRef={lastRef} key={cityData.city + cityData.region} />
          ) : (
            <CityCard cityData={cityData} key={cityData.city + cityData.region} />
          )
        )}
        <div onClick={onClickClose} className="btn  btn--primary city-search__btn">
          Подтвердить
        </div>
      </div>
    </Modal>
  );
};

export default CitySearch;
