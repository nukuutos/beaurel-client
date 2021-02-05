import { useState } from 'react';

import { END } from 'redux-saga';
import { wrapper } from '../redux/store';
import { getProfileStart } from '../redux/profile/actions';

import Layout from '../components/layout/layout';

import Header from '../components/profile/header/header';
import refreshToken from '../utils/refresh-token';
import SectionCards from '../components/profile/section-cards/section-cards';
import SectionReviews from '../components/profile/section-reviews/section-reviews';

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

  await refreshToken(req, res, store); // dispatch this?
  store.dispatch(getProfileStart({ id }));
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return { props: { custom: 'custom' } };
});

export default Profile;
