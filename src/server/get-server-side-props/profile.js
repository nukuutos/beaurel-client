import { getProfile } from '../../redux/slices/profile';
import { wrapper } from '../../redux/store';
import handlePublicAndAuthPage from '../../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import User from '../models/user/user';
import handleGlobalState from './utils/handle-global-state';

// customer page is private

const createGetProfile = (profileId) => async (user) => {
  const { id: userId, role, username } = user;
  const isOwner = userId === profileId || username === profileId;
  const isCustomer = isOwner && role === 'customer';

  let data;
  if (isCustomer) data = await User.getCustomerProfile(profileId);
  else data = await User.getMasterProfile(profileId, userId);

  return { data, user };
};

const handleProfile = ({ profileData, master, store }) => {
  const profile = { profile: { ...(master || {}), ...profileData } };
  store.dispatch(getProfile(profile));
};

const getProfileServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      const { id: profileId } = query;

      const getProfile = createGetProfile(profileId);

      const { data, user } = await handlePublicAndAuthPage(getProfile, { req, res, store });

      const { globalData, master, ...profileData } = data;

      // return 404
      if (!master?.id && !profileData?.id) {
        res.statusCode = 302;
        res.setHeader('Location', `/not-found`); // Replace <link> with your url link
        return;
      }

      handleGlobalState({ user, globalData, store });
      handleProfile({ profileData, master, store });

      return { props: {} };
    }
);

export default getProfileServerSideProps;
