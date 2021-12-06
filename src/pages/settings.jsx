import Layout from "../components/layout/layout";
import { wrapper } from "../redux/store";
import SettingInput from "../components/settings/setting-input/setting-input";
import NameInput from "../components/settings/name-input/name-input";
import IdInput from "../components/settings/id-input/id-input";
import EmailInput from "../components/settings/email-input/email-input";
import TelephoneInput from "../components/settings/telephone-input/telephone-input";
import useMediaQuery from "../hooks/use-media-query";
import CitySettings from "../components/layout/city/city-settings";
import CityInput from "../components/settings/city-input/city-input";

const Search = () => {
  const isPhone = useMediaQuery(600);

  return (
    <Layout>
      <main className={`content ${isPhone ? "" : "card card--layout"}`}>
        <h1 className="settings__heading heading mt-8 ">Настройки</h1>
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
  const { id } = query;

  return { props: { custom: "custom" } };
});

export default Search;
