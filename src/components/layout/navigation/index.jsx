import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Navbar from './navigation/navigation';

import masterNavbarLinks from './utils/master-navbar-links';
import customerNavbarLinks from './utils/customer-navbar-links';
import guestNavbarLinks from './utils/guest-navbar-links';

const NavbarController = () => {
  const { role, id, username } = useSelector((state) => state.auth);
  const router = useRouter();

  if (router.pathname === '/sign-in' || router.pathname === '/sign-up') {
    return <Navbar links={guestNavbarLinks} />;
  }

  if (role === 'master') {
    return <Navbar links={masterNavbarLinks({ username, masterId: id })} />;
  }

  if (role === 'customer') {
    return <Navbar links={customerNavbarLinks({ username, customerId: id })} />;
  }

  return <Navbar links={guestNavbarLinks} />;
};

export default NavbarController;
