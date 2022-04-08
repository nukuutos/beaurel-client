import React, { useRef, useState } from 'react';
import ModalHeading from '../../../../../base/modal/modal-heading';
import CitySearchForm from '../../../../../layout/city/city-search/city-search-form/city-search-form';
import useLoadOnRender from '../../../../../layout/city/city-search/use-load-on-render';
import useScroll from '../../../../../layout/city/city-search/use-scroll';

const City = ({ values, setFieldValue, closeCity }) => {
  const [data, setData] = useState([]);

  const form = useRef();
  const [lastRef, { page, hasMore }] = useScroll(form, setData);
  const isLoadingSome = useLoadOnRender(setData);

  return (
    <div className="city-search card">
      <ModalHeading
        titleDesktopClassName="city-search__heading"
        title="Выбрать город"
        onClickClose={closeCity}
      />
      {isLoadingSome && <div className="spinner-with-background" />}
      <div className="current-city">
        <span className="current-city__label">Ваше местоположение</span>
        <span className="current-city__value">{values.city}</span>
      </div>
      <CitySearchForm setData={setData} page={page} hasMore={hasMore} form={form} />
      {data.map((cityData, i) => {
        const { region, city } = cityData;

        const handleClick = () => {
          setFieldValue('city', city);
        };

        const activeClassName = values.city === city ? 'city-search__city--active' : '';

        return data.length - 5 === i ? (
          <div
            ref={lastRef}
            onClick={handleClick}
            className={`city-search__city ${activeClassName}`}
          >
            <span>{city}</span>
            <span className="city-search__region">{region}</span>
          </div>
        ) : (
          <div
            ref={lastRef}
            onClick={handleClick}
            className={`city-search__city ${activeClassName}`}
          >
            <span>{city}</span>
            <span className="city-search__region">{region}</span>
          </div>
        );
      })}

      <div onClick={closeCity} className="btn  btn--primary city-search__btn">
        Подтвердить
      </div>
    </div>
  );
};

export default City;
