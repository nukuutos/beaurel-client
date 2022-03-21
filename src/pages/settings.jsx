import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/layout/layout';
import FirstName from '../components/pages/settings/first-name/first-name';
import Username from '../components/pages/settings/username/username';
import TelephoneInput from '../components/pages/settings/telephone-input/telephone-input';
import LastName from '../components/pages/settings/last-name/last-name';
import getSettingsServerSideProps from '../server/get-server-side-props/settings';
import UpdatePassword from '../components/pages/settings/update-password/update-password';

const Settings = () => {
  const router = useRouter();

  const logout = () => {
    Cookies.set('isLogOut', true);
    router.push('/sign-in');
  };

  return (
    <Layout>
      <main className="content">
        <h1 className="settings__heading heading mt-8 ">Настройки</h1>
        <div className="settings__setting-card setting-card card">
          <div className="setting-card__heading mb-2 ">Информация о Вас</div>
          <Username />
          <FirstName />
          <LastName />
        </div>
        <div className="settings__setting-card setting-card card">
          <div className="setting-card__heading mb-2 ">Контактные данные</div>
          <TelephoneInput data="+79243240760" />
        </div>
        <UpdatePassword />
        <div className="settings__setting-card setting-card card">
          <div className="setting-card__heading">Выход из аккаунта</div>
          <div
            onClick={logout}
            className="setting-card__change-password btn btn--fail btn--secondary btn--flat"
          >
            Выйти
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = getSettingsServerSideProps;

export default Settings;
