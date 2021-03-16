import Layout from '../components/layout/layout';
import refreshToken from '../utils/refresh-token-auth';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingInput from '../components/settings/setting-input/setting-input';
import NameInput from '../components/settings/name-input/name-input';
import IdInput from '../components/settings/id-input/id-input';
import EmailInput from '../components/settings/email-input/email-input';
import TelephoneInput from '../components/settings/telephone-input/telephone-input';

const Search = () => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="settings__heading heading-primary mt-8 ">Настройки</h1>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mb-2 ">Информация о Вас</div>
          <IdInput data="nukuutos" />
          <NameInput data="Никита Волошин" />
        </div>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mb-2 ">Контактные данные</div>
          <EmailInput data="nukuutos@gmail.com" />
          <TelephoneInput data="+79243240760" />
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
