import React from 'react';
import { useSelector } from 'react-redux';
import Bars from '../../../../base/icons/bars';
import Crosshairs from '../../../../base/icons/crosshairs';
import SidenavLinks from './navbar-links/sidenav-links/sidenav-links';

const Sidenav = ({ openNavigation, openCitySearch }) => {
  const { id } = useSelector((state) => state.auth);

  const publicClassName = id ? '' : 'mobile-navbar__main--public';

  return (
    <nav className="mobile-navbar card card--layout">
      <ul className={`mobile-navbar__main ${publicClassName}`}>
        <SidenavLinks />
        {id ? (
          <li onClick={openNavigation} className="mobile-navbar__item mobile-navbar__item--menu">
            <Bars className="mobile-navbar__icon" />
          </li>
        ) : (
          <li onClick={openCitySearch} className="mobile-navbar__item mobile-navbar__item--menu">
            <Crosshairs className="mobile-navbar__icon" />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidenav;
