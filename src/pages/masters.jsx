import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { getMastersSuccess } from '../redux/profile/actions';
import User from '../server/models/user';
import handleAuthPage from '../utils/auth/handle-auth-page/handle-auth-page';
import renderMasters from '../components/pages/masters/render-masters';
import NoMasters from '../components/pages/masters/no-masters';

const Masters = ({ masters }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const isMasters = masters.length;

  return (
    <Layout>
      <main className={`content ${!isPhone ? 'card card--layout' : ''}`}>
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
