import React, { useState } from 'react';
import Modal from '../../../base/modal/modal';
import MainNavbar from './navbars/main-navbar';
import Sidenav from './navbars/sidenav';

const NavigationPhone = ({ links }) => {
  const [isActive, setIsActive] = useState(false);

  const visibleClassName = isActive ? 'mobile-sidenav--visible' : '';
  const mainNavbarClassName = `mobile-sidenav ${visibleClassName}`;

  const openNavigation = () => setIsActive(true);
  const closeNavigation = () => setIsActive(false);

  return (
    <>
      {isActive && (
        <Modal closeOnTouch className="modal--transparent" onClickClose={closeNavigation} />
      )}
      <MainNavbar closeNavigation={closeNavigation} links={links} className={mainNavbarClassName} />
      <Sidenav openNavigation={openNavigation} />
    </>
  );
};

export default NavigationPhone;
