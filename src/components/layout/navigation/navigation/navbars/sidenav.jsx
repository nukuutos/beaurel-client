import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useSidenav from './use-navbar/use-sidenav/use-sidenav';

const Sidenav = ({ openNavigation }) => {
  const sidenavLinks = useSidenav();

  return (
    <nav className="mobile-navbar card card--layout">
      <div className="mobile-navbar__main">
        {sidenavLinks}
        <li onClick={openNavigation} className="mobile-navbar__item">
          <FontAwesomeIcon className="mobile-navbar__icon" icon="bars" />
        </li>
      </div>
    </nav>
  );
};

export default Sidenav;
