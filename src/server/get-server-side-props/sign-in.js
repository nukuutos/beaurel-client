import cookie from 'cookie';
import { wrapper } from '../../redux/store';
import refreshToken from '../../utils/auth/handle-auth-page/refresh-token-auth';

const handleRefreshToken = async ({ req, res, store }) => {
  const user = await refreshToken(req, res, store);

  if (user) {
    const { id, username } = user;
    res.writeHead(302, { Location: `${username || id}` });
    return res.end();
  }
};

const handleLogOut = async ({ res, store }) => {
  const deletedIsLogOutCookie = cookie.serialize('isLogOut', '', {
    path: '/',
    expires: new Date(0),
  });

  const deletedRefreshTokenCookie = cookie.serialize('refreshToken', '', {
    path: '/',
    expires: new Date(0),
  });

  const deletedAccessTokenCookie = cookie.serialize('accessToken', '', {
    path: '/',
    expires: new Date(0),
  });

  res.setHeader('Set-Cookie', [
    deletedIsLogOutCookie,
    deletedRefreshTokenCookie,
    deletedAccessTokenCookie,
  ]);
};

const getSignInServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const { headers } = req;
  const { isLogOut, refreshToken: isRefreshToken } = cookie.parse(headers.cookie || ' ');

  if (isLogOut) handleLogOut({ res, store });
  else if (isRefreshToken) await handleRefreshToken({ req, res, store });

  return { props: { custom: 'custom' } };
});

export default getSignInServerSideProps;
