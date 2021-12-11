import { useSelector } from 'react-redux';
import MainNavbar from './navbars/main-navbar';

const NavigationDesktop = ({ links }) => {
  const { isPhone, isTabPort, isTabLand } = useSelector((state) => state.screenSize);

  return <MainNavbar links={links} isTabView={isPhone || isTabPort || isTabLand} />;
};

export default NavigationDesktop;
