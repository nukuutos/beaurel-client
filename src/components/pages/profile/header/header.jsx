import { useSelector } from 'react-redux';
import SomebodyHeader from './somebody-header';
import OwnHeader from './own-header';

const Header = () => {
  const [{ id: profileId }, { id: userId }] = useSelector((state) => [state.profile, state.auth]);

  const isSomebodyProfile = userId !== profileId;

  return isSomebodyProfile ? <SomebodyHeader /> : <OwnHeader />;
};

export default Header;
