import cookie from 'cookie';
import { refreshTokenSuccess } from '../../../redux/auth/actions';
import axios from '../../axios';

// it returns boolean and data: success(data => true) or false

const refreshToken = async (req, res, store) => {
  // without req?
  if (req) {
    const { cookie: headersCookie } = req.headers;
    const { refreshToken } = cookie.parse(headersCookie || ' ');

    if (!refreshToken) return false;

    try {
      const { data } = await axios('/auth/refresh-token', {
        method: 'POST',
        headers: {
          cookie: 'refreshToken=' + refreshToken,
        },
      });

      store.dispatch(refreshTokenSuccess(data));
      return data.id;
    } catch (error) {
      return false;
    }
  }
};

export default refreshToken;
