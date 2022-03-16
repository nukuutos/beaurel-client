import cookie from 'cookie';

const getAccessToken = (req, res) => {
  const { headers } = req;
  const { accessToken } = cookie.parse(headers.cookie || ' '); // parsing string not undefined

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('accessToken', '', { path: '/', expires: new Date(0) })
  );

  return accessToken;
};

export default getAccessToken;
