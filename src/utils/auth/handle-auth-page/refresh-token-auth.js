import cookie from 'cookie';
import { refreshTokenSuccess, refreshTokenFailure } from '../../../redux/auth/actions';
import verifyRefreshToken from '../utils/verify-refresh-token';
import User from '../../../server/models/user/user';
import { createAccessToken, createRefreshToken } from '../utils/create-tokens';

const { NODE_ENV, JWT_REFRESH_KEY_TIME } = process.env;

const refreshToken = async (req, res, store) => {
  const { cookie: headersCookie } = req.headers;
  const { refreshToken } = cookie.parse(headersCookie || ' '); // parsing string not undefined

  if (!refreshToken) return false;

  try {
    // verify token
    const userId = verifyRefreshToken(refreshToken);
    // get data
    const user = await User.getDataForTokens(userId);
    // create tokens
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    // set to response new refresh token
    const options = {
      httpOnly: true,
      secure: NODE_ENV !== 'development',
      maxAge: JWT_REFRESH_KEY_TIME, // 7 days env
      path: '/',
      sameSite: true,
    };

    const refreshTokenCookie = cookie.serialize('refreshToken', newRefreshToken, options);
    const deletedAccessTokenCookie = cookie.serialize('accessToken', '', {
      path: '/',
      expires: new Date(0),
    });
    res.setHeader('Set-Cookie', [refreshTokenCookie, deletedAccessTokenCookie]);

    const data = {
      accessToken: newAccessToken,
      username: user.username,
      role: user.role,
      id: user._id.toString(),
    };

    store.dispatch(refreshTokenSuccess(data));

    return data;
  } catch (error) {
    store.dispatch(refreshTokenFailure());
  }
};

export default refreshToken;
