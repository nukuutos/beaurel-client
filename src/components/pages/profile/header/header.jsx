import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const SomebodyHeader = dynamic(() => import('./somebody-header'));
const OwnHeader = dynamic(() => import('./own-header'));

const Header = () => {
  const [{ id: profileId }, { id: userId }] = useSelector((state) => [state.profile, state.auth]);

  const isSomebodyProfile = userId !== profileId;

  return isSomebodyProfile ? <SomebodyHeader /> : <OwnHeader />;
};

export default Header;
