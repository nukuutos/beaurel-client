import React, { useState } from 'react';
import Modal from '../../../base/modal/modal';
import CitySearch from '../../city/city-search/city-search';
import MainNavbar from './navbars/main-navbar';
import Sidenav from './navbars/sidenav';

const NavigationPhone = ({ links }) => {
  const [isCitySearch, setIsCitySearch] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const visibleClassName = isActive ? 'mobile-sidenav--visible' : '';
  const mainNavbarClassName = `mobile-sidenav ${visibleClassName}`;

  const openNavigation = () => setIsActive(true);
  const closeNavigation = () => setIsActive(false);

  const closeCitySearch = () => setIsCitySearch(false);
  const openCitySearch = () => setIsCitySearch(true);

  return (
    <>
      {isActive && (
        <Modal closeOnTouch className="modal--transparent" onClickClose={closeNavigation} />
      )}
      <MainNavbar closeNavigation={closeNavigation} links={links} className={mainNavbarClassName} />
      <Sidenav openCitySearch={openCitySearch} openNavigation={openNavigation} />

      {isCitySearch && <CitySearch onClickClose={closeCitySearch} />}
    </>
  );
};

export default NavigationPhone;
