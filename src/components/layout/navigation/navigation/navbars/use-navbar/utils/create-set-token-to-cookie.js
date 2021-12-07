import Cookies from 'js-cookie';

const createSetTokenToCookie = (accessToken) => () => {
  if (accessToken) Cookies.set('accessToken', accessToken);
};

export default createSetTokenToCookie;
