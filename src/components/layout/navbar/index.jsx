import { useSelector } from 'react-redux';

import Navbar from './navbar';

import masterNavbarLinks from './utils/master-navbar-links';
import customerNavbarLinks from './utils/customer-navbar-links';
import guestNavbarLinks from './utils/guest-navbar-links';

const NavbarController = () => {
  const { role, id } = useSelector((state) => state.auth);

  switch (role) {
    case 'master':
      return <Navbar links={masterNavbarLinks(id)} isAuth />;
    case 'user':
      return <Navbar links={customerNavbarLinks} isAuth />;
    default:
      return <Navbar links={guestNavbarLinks} />;
  }
};

export default NavbarController;
