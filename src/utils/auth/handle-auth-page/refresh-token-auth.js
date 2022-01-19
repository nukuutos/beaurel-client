import cookie from 'cookie';
import axios from '../../axios';
import { refreshTokenSuccess, refreshTokenFailure } from '../../../redux/auth/actions';

const refreshToken = async (req, res, store) => {
  // without req?
  if (!req) return;
  const { cookie: headersCookie } = req.headers;
  const { refreshToken } = cookie.parse(headersCookie || ' '); // parsing string not undefined

  // console.log(refreshToken, "suka");
  if (!refreshToken) return false;

  try {
    const { data } = await axios('/auth/refresh-token', {
      method: 'POST',
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });
    store.dispatch(refreshTokenSuccess(data));
    return data;
  } catch (error) {
    store.dispatch(refreshTokenFailure());
  }
};

export default refreshToken;
