import { wrapper } from '../redux/store';
import { getProfileSuccess } from '../redux/profile/actions';

import Layout from '../components/layout/layout';

import Header from '../components/pages/profile/header/header';
import SectionCards from '../components/pages/profile/section-cards/section-cards';
import SectionReviews from '../components/pages/profile/section-reviews/section-reviews';
import User from '../server/models/user';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import useMediaQuery from '../hooks/use-media-query';

const Profile = () => {
  const isMobile = useMediaQuery(600);

  return (
    <Layout>
      <main className={`content ${!isMobile ? 'card card--layout' : ''}`}>
        <Header />
        <SectionCards />
        <SectionReviews />
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id } = query;

  const getProfile = async () => await User.getMasterProfile(id);
  const profile = await handlePublicAndAuthPage(getProfile, { req, res, store });

  store.dispatch(getProfileSuccess({ profile: { ...profile, id } }));

  return { props: {} };
});

export default Profile;
