import MainNavbarLinks from './navbar-links/main-navbar-links';

const MainNavbar = ({ closeNavigation, className, links }) => (
  <nav onClick={closeNavigation} className={`navbar card card--layout ${className}`}>
    <ul className="navbar__list">
      <MainNavbarLinks links={links} />
    </ul>
  </nav>
);

export default MainNavbar;
