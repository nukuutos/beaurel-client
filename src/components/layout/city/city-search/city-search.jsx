import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useScroll from './use-scroll';
import Modal from '../../../base/modal/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import useLoadOnRender from './use-load-on-render';
import CityCard from './city-card';
import CitySearchForm from './city-search-form/city-search-form';

const CitySearch = ({ onClickClose }) => {
  const [{ city }, { isPhone }] = useSelector((state) => [state.timezone, state.screenSize]);
  const [data, setData] = useState([]);

  const form = useRef();
  const [lastRef, { page, hasMore }] = useScroll(form, setData);
  const isLoading = useLoadOnRender(setData);

  return (
    <Modal onClickClose={onClickClose}>
      <div className={`city-search ${isPhone ? '' : 'card'}`}>
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
            <CityCard cityData={cityData} cityRef={lastRef} />
          ) : (
            <CityCard cityData={cityData} />
          )
        )}
      </div>
    </Modal>
  );
};

export default CitySearch;
