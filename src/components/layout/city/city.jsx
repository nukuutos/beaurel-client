import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import CitySearch from './city-search/city-search';

const City = () => {
  const [isSearchCity, setIsSearchCity] = useState(false);
  const [{ city }, { isDesktop }] = useSelector((state) => [state.timezone, state.screenSize]);

  const closeModal = () => setIsSearchCity(false);
  const openModal = () => setIsSearchCity(true);

  return (
    <>
      <div onClick={openModal} className="city card">
        <FontAwesomeIcon className="city__icon" icon="crosshairs" />
        {isDesktop && city}
      </div>
      {isSearchCity && <CitySearch onClickClose={closeModal} />}
    </>
  );
};

export default City;
