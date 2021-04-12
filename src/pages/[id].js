import { wrapper } from '../redux/store';
import { getProfileSuccess } from '../redux/profile/actions';

import Layout from '../components/layout/layout';

import Header from '../components/profile/header/header';
import SectionCards from '../components/profile/section-cards/section-cards';
import SectionReviews from '../components/profile/section-reviews/section-reviews';
import handlePublicPageAuth from '../utils/handle-public-page-auth';
import User from '../server/models/user';

const Profile = () => {
  return (
    <Layout>
      <main className="content card card--layout">
        <Header />
        <SectionCards />
        <SectionReviews />
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id } = query;

  const getProfileCB = async () => await User.getMasterProfile(id);
  const profile = await handlePublicPageAuth(getProfileCB, { req, res, store });
  // if no profile => redirect(404 page)
  // check is public view, add it to dispatched object down below

  store.dispatch(getProfileSuccess({ profile: { ...profile, id } }));

  return { props: {} };
});

export default Profile;
