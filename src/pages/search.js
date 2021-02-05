import Layout from '../components/layout/layout';
import refreshToken from '../utils/refresh-token';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileRating from '../components/profile/header/profile-rating';
import StarProfile from '../components/profile/header/star-profile';
import Select from '../components/form/select';
import { Formik, Form } from 'formik';
import Input from '../components/form/input';
import { useState } from 'react';
import asyncCall from '../utils/async-call';
import { useDispatch } from 'react-redux';
import MasterCard from '../components/search/master-card';
import { getMastersStart, getMastersSuccess } from '../redux/profile/actions';
import axios from '../utils/axios';

const Search = ({ masters }) => {
  const [data, setData] = useState(masters);
  const dispatch = useDispatch();

  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="search__heading heading-primary mt-7">Найти мастера</h1>
        <Formik
          enableReinitialize
          // change specialization start va ue
          initialValues={{ search: '', specialization: '' }}
          onSubmit={async (values, { initialValues }) => {
            const { specialization, search } = values;

            const config = {
              method: 'get',
              url: `/profile?specialization=${specialization}&name=${search}`, // add city
              accessToken: 'nothing',
            };

            const data = await asyncCall(dispatch, config);

            if (data) {
              console.log(data);
              setData(data.masters);
            }
          }}>
          {({ values, dirty, isValid, submitForm, handleChange }) => (
            <Form className="search__form">
              <div className="search__specialization mt-7">
                <label className="label label--primary">Специализация</label>
                <Select
                  onChange={(e) => {
                    handleChange(e);
                    submitForm();
                  }}
                  className="input select"
                  name="specialization"
                  as="select">
                  <option className="option">Визажист</option>
                  <option className="option">Пункт 2</option>
                </Select>
              </div>

              <div className="search__name mt-7">
                <label className="label">Имя, id</label>
                <div className="input--icon">
                  <FontAwesomeIcon className="input__icon" icon="search" />
                  <Input
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                    type="text"
                    className="input"
                    name="search"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {data.map((master, i) => (
          <MasterCard className={'search__master-card  mt-7'} master={master} key={i} />
        ))}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  // через жопу поменяй всё(бек тоже) и с елай нормально
  await refreshToken(req, res, store);

  const {
    auth: { accessToken, id },
  } = store.getState();

  const { data } = await axios.get(`/profile/${id}/master`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  store.dispatch(getMastersSuccess(data));
  store.dispatch(END);

  await store.sagaTask.toPromise();
  return { props: { masters: data.data.masters || [] } };
});

export default Search;
