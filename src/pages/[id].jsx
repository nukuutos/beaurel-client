import { useSelector } from 'react-redux';
import { wrapper } from '../redux/store';
import { getProfileSuccess } from '../redux/profile/actions';

import Layout from '../components/layout/layout';

import Header from '../components/pages/profile/header/header';
import SectionCards from '../components/pages/profile/section-cards/section-cards';
import SectionReviews from '../components/pages/profile/section-reviews/section-reviews';
import User from '../server/models/user';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import { getFavorites } from '../redux/favorites/actions';

const Profile = () => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Layout>
      <main className={`content ${!isPhone ? 'card card--layout' : ''}`}>
        <Header />
        <SectionCards />
        <SectionReviews />
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id: masterId } = query;

  const getProfile = async (userId) => await User.getMasterProfile(masterId, userId);
  const profile = await handlePublicAndAuthPage(getProfile, { req, res, store });

  const { favorites, master, ...rating } = profile;

  store.dispatch(getProfileSuccess({ profile: { ...master, ...rating, id: masterId } }));
  store.dispatch(getFavorites(favorites || []));

  return { props: {} };
});

export default Profile;
