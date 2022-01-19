import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import FirstName from '../components/pages/settings/first-name/first-name';
import Username from '../components/pages/settings/username/username';
import EmailInput from '../components/pages/settings/email-input/email-input';
import TelephoneInput from '../components/pages/settings/telephone-input/telephone-input';
import CityInput from '../components/pages/settings/city-input/city-input';
import handleAuthPage from '../utils/auth/handle-auth-page/handle-auth-page';
import User from '../server/models/user';
import { setAuthData } from '../redux/auth/actions';
import LastName from '../components/pages/settings/last-name/last-name';

const Search = () => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        <h1 className="settings__heading heading mt-8 ">Настройки</h1>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mb-2 ">Информация о Вас</div>
          <Username />
          <FirstName />
          <LastName />
        </div>
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading mb-2 ">Контактные данные</div>
          <EmailInput data="nukuutos@gmail.com" />
          <TelephoneInput data="+79243240760" />
        </div>
        {isPhone && (
          <div className="settings__setting-card setting-card mt-8 card">
            <div className="setting-card__heading mb-2 ">Местоположение</div>
            <CityInput />
          </div>
        )}
        <div className="settings__setting-card setting-card mt-8 card">
          <div className="setting-card__heading">Изменить пароль</div>
          <div className="setting-card__change-password btn btn--secondary btn--flat">Изменить</div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const user = await handleAuthPage(req, res, store);
  const data = await User.getAuthData(user.id);
  store.dispatch(setAuthData(data));

  return { props: { custom: 'custom' } };
});

export default Search;
