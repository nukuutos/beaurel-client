import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import { useState, useRef } from 'react';
import Axios from 'axios';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import Select from '../components/form/select';
import Input from '../components/form/input';
import MasterCard from '../components/search/master-card';
import { getMastersSuccess } from '../redux/profile/actions';
import User from '../server/models/user';
import useAsyncAction from '../hooks/use-async-action/use-async-action';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import useSearch from '../components/search/use-search';
import useMediaQuery from '../hooks/use-media-query';

const specializations = [
  '',
  'Визажист',
  'Парикмахер',
  'Мастер ногтевого сервиса',
  'Массажист',
  'Косметолог',
  'Мастер татуажа',
  'Бровист',
  'Лешмейкер',
  'Мастер депиляции',
  'Колорист',
  'Барбер',
];

const Search = ({ masters }) => {
  const [data, setData] = useState(masters);

  const [asyncAction, isTextLoading] = useAsyncAction();

  const form = useRef();
  const [lastMasterCardRef, { page, hasMore }, isSearchLoading] = useSearch(form, setData);
  const isMobile = useMediaQuery(600);

  const isLoading = isTextLoading || isSearchLoading;

  const cancel = useRef(null);

  return (
    <Layout>
      <main className={`content ${!isMobile ? 'card card--layout' : ''}`}>
        <h1 className="search__heading heading">Найти мастера</h1>
        <Formik
          innerRef={form}
          enableReinitialize
          // change specialization start value
          initialValues={{ search: '', specialization: '' }}
          onSubmit={async (values, { initialValues }) => {
            const { specialization, search } = values;

            const config = {
              method: 'get',
              url: `/master`,
              params: { specialization, name: search, page: 0 }, // add city
              accessToken: 'nothing',
              cancelToken: new Axios.CancelToken((c) => (cancel.current = c)),
            };

            const data = await asyncAction(config);

            if (data) setData(data.masters);

            hasMore.current = true;
            page.current = 0;
          }}
        >
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
                  as="select"
                >
                  {specializations.map((specialization) => (
                    <option className="option">{specialization}</option>
                  ))}
                </Select>
              </div>

              <div className="search__name mt-7">
                <label className="label">Имя, id</label>
                <div className="input--icon">
                  <FontAwesomeIcon className="input__icon" icon="search" />
                  <Input
                    onChange={(e) => {
                      if (cancel.current) cancel.current();
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

        {!data.length && !isLoading && (
          <img className="search__no-masters" src="/svg/no-masters.svg" />
        )}

        {data.map((master, i) => {
          const isPreLastCard = i === data.length - 2;

          return isPreLastCard ? (
            <MasterCard
              masterCardRef={lastMasterCardRef}
              className="search__master-card"
              master={master}
              key={i}
            />
          ) : (
            <MasterCard className="search__master-card" master={master} key={i} />
          );
        })}

        {isLoading && <div className="search__spinner spinner" />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const getMastersFromDb = async (userId) => {
    if (userId) return await User.findMastersWithFavorites(userId);
    return await User.findMasters();
  };

  const { masters, favoriteMasters } = await handlePublicAndAuthPage(getMastersFromDb, {
    req,
    res,
    store,
  });

  // dispatch to favorite
  store.dispatch(getMastersSuccess({ favoriteMasters }));

  return { props: { masters } }; // every master
});

export default Search;
