import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import CitySearch from './city-search/city-search';
import Crosshairs from '../../base/icons/crosshairs';

const City = () => {
  const [isSearchCity, setIsSearchCity] = useState(false);
  const [{ city }, { isDesktop }] = useSelector((state) => [state.timezone, state.screenSize]);

  const closeModal = () => setIsSearchCity(false);
  const openModal = () => setIsSearchCity(true);

  return (
    <>
      <div onClick={openModal} className="city card">
        <Crosshairs className="city__icon" />
        {isDesktop && city}
      </div>
      {isSearchCity && <CitySearch onClickClose={closeModal} />}
    </>
  );
};

export default City;
