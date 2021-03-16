import getAccessToken from './get-access-token';
import refreshToken from './refresh-token';
import verifyToken from '../server/utils/verify-token';

// if we are on the public and auth page
// we handle auth by handlePublicPageAuth

const thereIsToken = async (accessToken, cb, { req, res, store }) => {
  let userId = verifyToken(accessToken);
  console.log(userId);
  console.log(userId);
  console.log(userId);
  console.log(userId);
  // if token expired or something do refresh and get userId
  if (!userId) userId = await refreshToken(req, res, store);

  return await cb(userId);
};

const thereIsNoToken = async (cb, { req, res, store }) => {
  const userId = await refreshToken(req, res, store);
  return await cb(userId);
};

const handlePublicPageAuth = async (cb, ctx) => {
  // cb can have userId as an argument
  // cb is needed to get data from db
  const { req, res } = ctx;

  const accessToken = getAccessToken(req, res);

  if (accessToken) return await thereIsToken(accessToken, cb, ctx);
  return await thereIsNoToken(cb, ctx);
};

export default handlePublicPageAuth;
