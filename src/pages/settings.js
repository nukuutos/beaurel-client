import Layout from '../components/layout/layout';
import refreshToken from '../utils/refresh-token';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingInput from '../components/settings/setting-input/setting-input';

const Search = () => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="settings__heading heading-primary mt-8 ">Настройки</h1>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mb-2 ">Информация о Вас</div>
          <SettingInput label="Ваш Id" data="nukuutos" />
          <SettingInput label="Имя" data="Никита Волошин" />
        </div>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mb-2 ">Контактные данные</div>
          <SettingInput label="Email" data="nukuutos@gmail.com" />
          <SettingInput label="Телефон" data="+79243240760" />
        </div>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading">Изменить пароль</div>
          <div className="setting-card__change-password btn btn--secondary btn--flat">Изменить</div>
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
