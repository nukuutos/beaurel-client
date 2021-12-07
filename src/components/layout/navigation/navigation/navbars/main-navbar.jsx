import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import useMainNavbar from './use-navbar/use-main-navbar/use-main-navbar';
import { signOut } from '../../../../../redux/auth/actions';

const MainNavbar = ({ className, links, isTabView = false }) => {
  const { accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigationLinks = useMainNavbar(links, isTabView);

  const logOut = () => dispatch(signOut());

  return (
    <nav className={`navbar card card--layout ${className}`}>
      {navigationLinks}
      {accessToken && (
        <li onClick={logOut} className="navbar__link">
          <Link href="/">
            <a>
              <FontAwesomeIcon className="navbar__icon" icon="door-open" />
              {!isTabView && 'Выход'}
            </a>
          </Link>
        </li>
      )}
    </nav>
  );
};

export default MainNavbar;
