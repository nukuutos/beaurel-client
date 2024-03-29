import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChevronDown from '../../../../base/icons/chevron-down';
import CitySearch from '../../../../layout/city/city-search/city-search';

const City = () => {
  const { city } = useSelector((state) => state.timezone);

  const [isModal, setIsModal] = useState(false);

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return (
    <>
      <div className="sign-up__group mt-7">
        <label className="label" htmlFor="city">
          Город
        </label>
        <div onClick={openModal} className="sign-up__input--city input sign-up__input">
          {city}
          <ChevronDown />
        </div>
      </div>
      {isModal && <CitySearch onClickClose={closeModal} />}
    </>
  );
};

export default City;
