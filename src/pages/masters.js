import React from 'react';
import StarProfile from '../components/profile/header/star-profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileRating from '../components/profile/header/profile-rating';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import refreshToken from '../utils/refresh-token';
import { END } from 'redux-saga';
import { getMastersSuccess } from '../redux/profile/actions';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import MasterCard from '../components/search/master-card';

const Masters = ({ masters }) => {
  // const [masters, setMasters] = useState(masters);
  console.log(masters);
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

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  await refreshToken(req, res, store); // dispatch this?

  const {
    auth: { accessToken, id },
  } = store.getState();

  // unnecessarily data (not favorite masters)

  const { data } = await axios.get(`/profile/${id}/master/favorites`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(data);
  store.dispatch(getMastersSuccess({ data: { favoriteMasters: [{ masters: data.data.ids }] } }));

  store.dispatch(END);
  await store.sagaTask.toPromise();
  return { props: { masters: data.data.masters } };
});

export default Masters;
