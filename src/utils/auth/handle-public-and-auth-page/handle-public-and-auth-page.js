import getAccessToken from '../utils/get-access-token';
import refreshToken from './refresh-token';
import verifyToken from '../../../server/utils/verify-token';

// if we are on the public and auth page
// Page is auth and public in the same time

const thereIsToken = async (accessToken, cb, { req, res, store }) => {
  let user = verifyToken(accessToken);
  // if token expired or something do refresh and get userId
  if (!user) user = await refreshToken(req, res, store);

  return await cb(user);
};

const thereIsNoToken = async (cb, { req, res, store }) => {
  const user = await refreshToken(req, res, store);
  return await cb(user);
};

const handlePublicAndAuthPage = async (cb, ctx) => {
  // cb can have userId as an argument
  // cb is needed to get data from db
  const { req, res } = ctx;

  const accessToken = getAccessToken(req, res);

  if (accessToken) return await thereIsToken(accessToken, cb, ctx);
  return await thereIsNoToken(cb, ctx);
};

export default handlePublicAndAuthPage;
