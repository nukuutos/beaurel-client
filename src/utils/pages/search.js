import refreshToken from '../refresh-token';
import verifyToken from '../../server/utils/verify-token';
import getAccessToken from '../get-access-token';

// use it like a cb that gets userId

// const getMasters = async (accessToken, req, res, store) => {
//   // two cases for get masters(there is token and there is not token)
//   if (accessToken) return await thereIsToken(accessToken, req, res, store);
//   return await thereIsNoToken(req, res, store);
// };
