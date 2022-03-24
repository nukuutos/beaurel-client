import useCreateSetCityToCookie from './use-create-set-city-to-cookie';
import useCreateSetTokenToCookie from './use-create-set-token-to-cookie';

const useHandleClick = (path) => {
  const setTokenToCookie = useCreateSetTokenToCookie();
  const setCityToCookie = useCreateSetCityToCookie();

  const handleClick = () => {
    setTokenToCookie();
    if (path === '/search') setCityToCookie();
  };

  return handleClick;
};

export default useHandleClick;
