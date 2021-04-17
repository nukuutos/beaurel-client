import React from 'react';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { getMastersSuccess } from '../redux/profile/actions';
import MasterCard from '../components/search/master-card';
import User from '../server/models/user';
import handleAuthPage from '../utils/auth/hande-auth-page/handle-auth-page';

const Masters = ({ masters }) => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="masters__heading  heading mt-8">Твои Мастера</h1>
        {masters.length &&
          masters.map((master, i) => <MasterCard className={'masters__master-card mt-7'} master={master} key={i} />)}
        {!masters.length && (
          <div className="appointments__noappointments card mt-8">Сохраняйте своих любимых мастеров</div>
        )}
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
