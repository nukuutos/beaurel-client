import cookie from 'cookie';
import axios from '../utils/axios';

import { refreshTokenSuccess, refreshTokenFailure } from '../redux/auth/actions';
import { END } from 'redux-saga';

const refreshToken = async (req, res, store) => {
  if (req) {
    const publicUrls = ['/sign-in', '/sign-up']; // public urls

    const { headers, url } = req;
    const { refreshToken } = cookie.parse(headers.cookie || ' '); // parsing string not undefined
    const isPublicUrl = publicUrls.includes(url);

    if (!refreshToken && !isPublicUrl) {
      res.writeHead(302, { location: 'http://localhost:3000/sign-in' });
      res.end();
    }

    if (refreshToken && !isPublicUrl) {
      try {
        const { data } = await axios('/auth/refresh-token', {
          method: 'POST',
          headers: {
            cookie: 'refreshToken=' + refreshToken,
          },
        });

        store.dispatch(refreshTokenSuccess(data));
      } catch (error) {
        store.dispatch(refreshTokenFailure(error));
        store.dispatch(END);
        res.writeHead(302, { location: 'http://localhost:3000/sign-in' });
        res.end();
      }
    }
  }
};

export default refreshToken;
