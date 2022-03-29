import cookie from 'cookie';

const getCityFromCookie = (req, res) => {
  const { headers } = req;
  const { city } = cookie.parse(headers.cookie || ' '); // parsing string not undefined

  const deleteCityCookie = cookie.serialize('city', '', { path: '/', expires: new Date(0) });
  const deleteAccessTokenCookie = cookie.serialize('accessToken', '', {
    path: '/',
    expires: new Date(0),
  });

  res.setHeader('Set-Cookie', [deleteCityCookie, deleteAccessTokenCookie]); // delete cookie

  return city;
};

export default getCityFromCookie;
