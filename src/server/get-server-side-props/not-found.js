import { wrapper } from '../../redux/store';
import handlePublicAndAuthPage from '../../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import User from '../models/user/user';
import handleGlobalState from './utils/handle-global-state';

const getNotifications = async (user) => {
  const data = await User.getNotifications(user.id);
  return { data, user };
};

const getNotFoundServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const { data, user } = await handlePublicAndAuthPage(getNotifications, { req, res, store });
  const { globalData } = data || {};

  handleGlobalState({ globalData, user, store });

  return { props: {} };
});

export default getNotFoundServerSideProps;
