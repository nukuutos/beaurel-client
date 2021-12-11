import { useSelector } from 'react-redux';
import NavigationDesktop from './navigation-desktop';
import NavigationPhone from './navigation-phone';

const Navigation = ({ links }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? <NavigationPhone links={links} /> : <NavigationDesktop links={links} />;
};

export default Navigation;
