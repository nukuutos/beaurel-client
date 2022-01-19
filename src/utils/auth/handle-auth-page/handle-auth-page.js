import getAccessToken from '../utils/get-access-token';
import verifyToken from '../../../server/utils/verify-token';
import refreshTokenAuth from './refresh-token-auth';

const handleAuthPage = async (req, res, store) => {
  let user;

  const accessToken = getAccessToken(req, res);
  // if we ve got access token, verify it
  if (accessToken) user = verifyToken(accessToken);
  // if token not verified or access token is absent => refresh it
  if (!user) user = await refreshTokenAuth(req, res, store);

  if (!user) {
    res.writeHead(302, { Location: '/sign-in' });
    res.end();
  }

  return user;
};

export default handleAuthPage;
