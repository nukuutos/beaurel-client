import getCityFromCookie from '../../components/pages/search/get-city-from-cookie';
import { wrapper } from '../../redux/store';
import handlePublicAndAuthPage from '../../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import User from '../models/user/user';
import handleGlobalState from './utils/handle-global-state';

const handleAuthCase = async (user, city) => {
  const { id: userId } = user;
  if (!city) city = await User.getCity(userId);
  const data = await User.findMastersWithFavorites(userId, city);
  return { data, user };
};

const createGetMasters = (req, res) => async (user) => {
  let city = getCityFromCookie(req, res);

  if (user.id) return await handleAuthCase(user, city);

  if (!city) city = 'Хабаровск';

  const data = await User.findMasters(city);

  return { data, user };
};

const getSearchServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const getMasters = createGetMasters(req, res);
  const { data, user } = await handlePublicAndAuthPage(getMasters, { req, res, store });
  const { masters, globalData } = data;

  handleGlobalState({ globalData, user, store });

  return { props: { masters: masters || [] } };
});

export default getSearchServerSideProps;
