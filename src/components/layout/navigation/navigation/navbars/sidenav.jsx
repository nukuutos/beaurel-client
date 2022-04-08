import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import SidenavLinks from './navbar-links/sidenav-links/sidenav-links';

const Sidenav = ({ openNavigation, openCitySearch }) => {
  const { id } = useSelector((state) => state.auth);

  const publicClassName = id ? '' : 'mobile-navbar__main--public';

  return (
    <nav className="mobile-navbar card card--layout">
      <div className={`mobile-navbar__main ${publicClassName}`}>
        <SidenavLinks />
        {id ? (
          <li onClick={openNavigation} className="mobile-navbar__item mobile-navbar__item--menu">
            <FontAwesomeIcon className="mobile-navbar__icon" icon="bars" />
          </li>
        ) : (
          <li onClick={openCitySearch} className="mobile-navbar__item mobile-navbar__item--menu">
            <FontAwesomeIcon className="mobile-navbar__icon" icon="crosshairs" />
          </li>
        )}
      </div>
    </nav>
  );
};

export default Sidenav;
