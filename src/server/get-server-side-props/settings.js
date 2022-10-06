import { setAuthData } from '../../redux/slices/auth';
import { wrapper } from '../../redux/store';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import User from '../models/user/user';
import handleGlobalState from './utils/handle-global-state';

const getSettingsServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const user = await handleAuthPage(req, res, store);
  const { globalData, ...userData } = await User.getAuthData(user.id);
  handleGlobalState({ user, globalData, store });
  store.dispatch(setAuthData(userData));

  return { props: {} };
});

export default getSettingsServerSideProps;
