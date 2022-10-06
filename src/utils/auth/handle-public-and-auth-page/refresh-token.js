import cookie from 'cookie';
import { refreshTokenSuccess } from '../../../redux/slices/auth';
import verifyRefreshToken from '../utils/verify-refresh-token';
import User from '../../../server/models/user/user';
import { createAccessToken, createRefreshToken } from '../utils/create-tokens';

const { NEXT_PUBLIC_NODE_ENV, JWT_REFRESH_KEY_TIME } = process.env;
// it returns boolean and data: success(data => true) or false

const refreshToken = async (req, res, store) => {
  const { cookie: headersCookie } = req.headers;
  const { refreshToken } = cookie.parse(headersCookie || ' ');

  if (!refreshToken) return false;

  try {
    const userId = verifyRefreshToken(refreshToken);
    // get data
    const user = await User.getDataForTokens(userId);
    // create tokens
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    // set to response new refresh token
    const options = {
      httpOnly: true,
      secure: NEXT_PUBLIC_NODE_ENV !== 'development',
      maxAge: JWT_REFRESH_KEY_TIME, // 7 days env
      path: '/',
      sameSite: true,
    };

    const refreshTokenCookie = cookie.serialize('refreshToken', newRefreshToken, options);
    res.setHeader('Set-Cookie', refreshTokenCookie);

    const data = {
      accessToken: newAccessToken,
      username: user.username,
      role: user.role,
      id: user._id.toString(),
    };

    store.dispatch(refreshTokenSuccess(data));
    return data;
  } catch (error) {
    return false;
  }
};

export default refreshToken;
