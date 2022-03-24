import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const useCreateSetCityToCookie = () => {
  const { city } = useSelector((state) => state.timezone);

  return () => {
    if (city) Cookies.set('city', city);
  };
};

export default useCreateSetCityToCookie;
