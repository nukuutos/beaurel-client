import useMediaQuery from '../../../../hooks/use-media-query';
import NavigationDesktop from './navigation-desktop';
import NavigationPhone from './navigation-phone';

const Navigation = ({ links }) => {
  const isPhone = useMediaQuery(600);

  return isPhone ? <NavigationPhone links={links} /> : <NavigationDesktop links={links} />;
};

export default Navigation;
