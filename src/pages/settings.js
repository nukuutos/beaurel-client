import Layout from '../components/layout/layout';
import refreshToken from '../utils/refresh-token';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="settings__heading heading-primary mt-8 ">Настройки</h1>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mt-4 mb-4 ">Информация о Вас</div>
          {/* 
          <label className="form__label">Ваш Id</label>
          <input className="form__input" value="nukuutos" type="text" /> */}

          <div className="setting-card__display form__input--display">
            <label className="form__label">Ваш Id</label>
            nukuutos
          </div>
          <div className="setting-card__edit-button btn--edit">
            <FontAwesomeIcon icon="pen" />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id } = query;

  await refreshToken(req, res, store); // dispatch this?
  // store.dispatch(getProfileStart({ id }));
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return { props: { custom: 'custom' } };
});

export default Search;
