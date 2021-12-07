import useMediaQuery from '../../../../hooks/use-media-query';
import MainNavbar from './navbars/main-navbar';

const NavigationDesktop = ({ links }) => {
  const isTabLand = useMediaQuery(1200);

  return <MainNavbar links={links} isTabView={isTabLand} />;
};

export default NavigationDesktop;
