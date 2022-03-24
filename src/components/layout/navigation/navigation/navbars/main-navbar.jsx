import MainNavbarLinks from './navbar-links/main-navbar-links/main-navbar-links';

const MainNavbar = ({ closeNavigation, className, links }) => (
  <nav onClick={closeNavigation} className={`navbar card card--layout ${className}`}>
    <MainNavbarLinks links={links} />
  </nav>
);

export default MainNavbar;
