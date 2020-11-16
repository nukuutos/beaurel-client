import { useSelector } from 'react-redux';

import Navbar from './navbar';

import masterNavbarLinks from './utils/master-navbar-links';
import customerNavbarLinks from './utils/customer-navbar-links';
import guestNavbarLinks from './utils/guest-navbar-links';

const NavbarController = () => {
  const role = useSelector((state) => state.auth.role);

  switch (role) {
    case 'master':
      return <Navbar links={masterNavbarLinks} isAuth />;
    case 'user':
      return <Navbar links={customerNavbarLinks} isAuth />;
    default:
      return <Navbar links={guestNavbarLinks} />;
  }
};

export default NavbarController;
