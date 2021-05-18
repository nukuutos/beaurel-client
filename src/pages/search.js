import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../components/form/select';
import { Formik, Form } from 'formik';
import Input from '../components/form/input';
import { useState } from 'react';
import MasterCard from '../components/search/master-card';
import { getMastersSuccess } from '../redux/profile/actions';
import User from '../server/models/user';
import useAsyncAction from '../hooks/use-async-action/use-async-action';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';

const Search = ({ masters }) => {
  const [data, setData] = useState(masters);
  const [asyncAction, isLoading] = useAsyncAction();

  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="search__heading heading mt-7">Найти мастера</h1>
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

            const data = await asyncAction(config);

            if (data) setData(data.masters);
          }}>
          {({ submitForm, handleChange }) => (
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
                    className="input ml-1"
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

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const getMastersFromDb = async (userId) => {
    if (userId) return await User.findMastersWithFavorites(userId);
    return await User.findMasters();
  };

  const { masters, favoriteMasters } = await handlePublicAndAuthPage(getMastersFromDb, { req, res, store });
  // dispatch to favorite
  store.dispatch(getMastersSuccess({ favoriteMasters }));

  return { props: { masters } }; // every master
});

export default Search;
