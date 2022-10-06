import { wrapper } from '../../redux/store';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import User from '../models/user/user';
import handleGlobalState from './utils/handle-global-state';

const getMastersServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const user = await handleAuthPage(req, res, store);
  const globalData = await User.getFavoriteMasters(user.id);

  handleGlobalState({ user, globalData, store });

  return { props: {} };
});

export default getMastersServerSideProps;
