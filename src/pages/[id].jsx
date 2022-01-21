import { useSelector } from 'react-redux';
import { wrapper } from '../redux/store';
import { getProfileSuccess } from '../redux/profile/actions';

import Layout from '../components/layout/layout';

import User from '../server/models/user';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import { getFavorites } from '../redux/favorites/actions';
import MasterProfile from '../components/pages/profile/master-profile/master-profile';
import CustomerProfile from '../components/pages/profile/customer-profile/customer-profile';

const Profile = () => {
  const [{ role }, { isPhone }] = useSelector((state) => [state.profile, state.screenSize]);
  const customerClassName = role === 'customer' ? 'profile--customer' : '';

  return (
    <Layout>
      <main className={`content ${customerClassName} ${!isPhone ? 'card card--layout' : ''}`}>
        {role === 'master' ? <MasterProfile /> : <CustomerProfile />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id: profileId } = query;

  const getProfile = async ({ id: userId, role, username }) => {
    // customer page is private
    const isOwner = userId === profileId || username === profileId;
    const isCustomer = isOwner && role === 'customer';

    let data;
    if (isCustomer) data = await User.getCustomerProfile(profileId);
    else data = await User.getMasterProfile(profileId, userId);

    if (!data) {
      // return 404
    }

    return data;
  };

  const profile = await handlePublicAndAuthPage(getProfile, { req, res, store });

  const { favorites, master, ...restData } = profile;

  store.dispatch(getProfileSuccess({ profile: { ...(master || {}), ...restData, id: profileId } }));
  store.dispatch(getFavorites(favorites || []));

  return { props: {} };
});

export default Profile;
