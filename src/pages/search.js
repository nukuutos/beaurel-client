import Layout from '../components/layout/layout';
import refreshToken from '../utils/refresh-token';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileRating from '../components/profile/header/profile-rating';
import StarProfile from '../components/profile/header/star-profile';

const Search = () => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="search__heading heading-primary mt-7">Найти мастера</h1>

        <div className="search__specialization mt-7">
          <label className="form__label form__label--primary">Специализация</label>
          <select className="form__input form__select">
            <option className="form__option">Пункт 1</option>
            <option className="form__option">Пункт 2</option>
          </select>
        </div>

        <div className="search__name mt-7">
          <label className="form__label">Имя, id</label>
          <div className="form__input--icon">
            <FontAwesomeIcon className="form__left-icon" icon="search" />
            <input type="text" className="form__input" />
          </div>
        </div>

        <div className="search__master-card master-card card mt-7">
          <div className="master-card__identify">
            <img src={`/img/profile-photo.jpeg`} alt="Profile image" className="master-card__avatar" />
            <ProfileRating className="mt-2" ratingScore={5} />
          </div>
          <div className="master-card__biography">
            <h1 className="master-card__name mt-3">Никита В.</h1>
            <h2 className="master-card__specialization mt-3">Визажист</h2>
            <div className="master-card__geoposition mt-3">
              <FontAwesomeIcon className="master-card__map-marker" icon="map-marker-alt" />
              Хабаровск, П-р Санитарной 3
            </div>
          </div>
          <StarProfile initialIsStarred />
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
