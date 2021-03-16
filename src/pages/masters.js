import React from 'react';
import StarProfile from '../components/profile/header/star-profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileRating from '../components/profile/header/profile-rating';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import refreshToken from '../utils/refresh-token-auth';
import { END } from 'redux-saga';
import { getMastersSuccess } from '../redux/profile/actions';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import MasterCard from '../components/search/master-card';
import getAccessToken from '../utils/get-access-token';
import verifyToken from '../server/utils/verify-token';
import User from '../server/models/user';
import handleAuth from '../utils/handle-auth';

const Masters = ({ masters }) => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="heading-primary mt-8">Твои Мастера</h1>
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
  const userId = await handleAuth(req, res, store);

  const data = await User.getFavoriteMasters(userId);

  store.dispatch(getMastersSuccess({ favoriteMasters: data.masterIds }));

  return { props: { masters: data.masters || [] } };
});

export default Masters;
