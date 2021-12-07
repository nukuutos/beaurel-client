import { useSelector } from 'react-redux';

import Navbar from './navigation/navigation';

import masterNavbarLinks from './utils/master-navbar-links';
import customerNavbarLinks from './utils/customer-navbar-links';
import guestNavbarLinks from './utils/guest-navbar-links';

const NavbarController = () => {
  const { role, id } = useSelector((state) => state.auth);

  switch (role) {
    case 'master':
      return <Navbar links={masterNavbarLinks(id)} />;
    case 'user':
      return <Navbar links={customerNavbarLinks} />;
    default:
      return <Navbar links={guestNavbarLinks} />;
  }
};

export default NavbarController;
