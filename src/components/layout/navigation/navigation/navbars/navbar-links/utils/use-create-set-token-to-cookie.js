import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const useCreateSetTokenToCookie = () => {
  const { id: accessToken } = useSelector((state) => state.auth);

  return () => {
    if (accessToken) Cookies.set('accessToken', accessToken);
  };
};
export default useCreateSetTokenToCookie;
