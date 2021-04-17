import cookie from 'cookie';
import axios from '../utils/axios';

import { refreshTokenSuccess, refreshTokenFailure } from '../redux/auth/actions';
import { END } from 'redux-saga';

/// ?
const authRedirect = async (req, res, store) => {
  if (req) {
    const { refreshToken } = cookie.parse(req.headers.cookie || ' '); // parsing string not undefined

    if (refreshToken) {
      try {
        const { data } = await axios('/auth/refresh-token', {
          method: 'POST',
          headers: {
            cookie: 'refreshToken=' + refreshToken,
          },
        });

        store.dispatch(refreshTokenSuccess({ accessToken: data.accessToken, role: data.role }));
        res.writeHead(302, { location: 'https://localhost:3000/profile' }); // condition? master to profile, customer to find masters?
        res.end();
      } catch (error) {
        store.dispatch(refreshTokenFailure());
        store.dispatch(END);
        res.end();
      }
    }
  }
};

export default authRedirect;
