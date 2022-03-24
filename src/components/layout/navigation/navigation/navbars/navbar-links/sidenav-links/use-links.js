import { useSelector } from 'react-redux';
import publicLinks from './public-links';
import useAuthLinks from './use-auth-links';

const useLinks = () => {
  const { id } = useSelector((state) => state.auth);
  const authLinks = useAuthLinks();

  return id ? authLinks : publicLinks;
};

export default useLinks;
