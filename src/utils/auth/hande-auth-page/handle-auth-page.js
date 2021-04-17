import getAccessToken from '../utils/get-access-token';
import verifyToken from '../../../server/utils/verify-token';
import refreshTokenAuth from './refresh-token-auth';

const handleAuthPage = async (req, res, store) => {
  let userId;

  const accessToken = getAccessToken(req, res);
  // if we ve got access token, verify it
  if (accessToken) userId = verifyToken(accessToken);
  // if token not verified or access token is absent => refresh it
  if (!userId) userId = await refreshTokenAuth(req, res, store);

  return userId;
};

export default handleAuthPage;
