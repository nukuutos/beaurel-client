import { useState } from 'react';

import { END } from 'redux-saga';
import { wrapper } from '../redux/store';
import { getProfileStart } from '../redux/profile/actions';

import Layout from '../components/layout/layout';

import Header from '../components/profile/header/header';
import refreshToken from '../utils/refresh-token';
import SectionAbout from '../components/profile/section-about/section-about';
import SectionCards from '../components/profile/section-cards/section-cards';
import SectionReviews from '../components/profile/section-reviews/section-reviews';

const Profile = () => {
  return (
    <Layout>
      <div className="content content--profile">
        <Header />

        <main className="profile__main">
          <SectionAbout />
          <SectionCards />
          <SectionReviews />
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  await refreshToken(req, res, store);
  store.dispatch(getProfileStart());
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return { props: { custom: 'custom' } };
});

export default Profile;
