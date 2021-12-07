import React from 'react';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { getMastersSuccess } from '../redux/profile/actions';
import User from '../server/models/user';
import handleAuthPage from '../utils/auth/hande-auth-page/handle-auth-page';
import useMediaQuery from '../hooks/use-media-query';
import renderMasters from '../components/pages/masters/render-masters';
import NoMasters from '../components/pages/masters/no-masters';

const Masters = ({ masters }) => {
  const isMobile = useMediaQuery(600);

  const isMasters = masters.length;

  return (
    <Layout>
      <main className={`content ${!isMobile ? 'card card--layout' : ''}`}>
        <h1 className="masters__heading heading">Твои Мастера</h1>
        {isMasters ? renderMasters(masters) : <NoMasters />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const userId = await handleAuthPage(req, res, store);
  const data = await User.getFavoriteMasters(userId);

  store.dispatch(getMastersSuccess({ favoriteMasters: data.masterIds }));

  return { props: { masters: data.masters || [] } };
});

export default Masters;
