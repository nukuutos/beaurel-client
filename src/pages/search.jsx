import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import User from '../server/models/user';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import useSearch from '../components/pages/search/use-search';
import useOnSubmit from '../components/pages/search/use-on-submit';
import SearchForm from '../components/pages/search/search-form';
import renderMasterCards from '../components/pages/search/render-master-cards';
import NoMasters from '../components/pages/search/no-masters';
import { getFavorites } from '../redux/favorites/actions';

const Search = ({ masters }) => {
  const [data, setData] = useState(masters);

  const form = useRef();

  const [refToLoadData, { page, hasMore }, isLoadingOnScroll] = useSearch(form, setData);
  const [handleSubmit, isLoadingOnType, cancelSubmit] = useOnSubmit({ setData, hasMore, page });

  const isLoading = isLoadingOnType || isLoadingOnScroll;
  const isData = data.length;

  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Layout>
      <main className={`content ${!isPhone ? 'card card--layout' : ''}`}>
        <h1 className="search__heading heading">Найти мастера</h1>
        <SearchForm form={form} handleSubmit={handleSubmit} cancelSubmit={cancelSubmit} />
        {!isData && !isLoading && <NoMasters />}
        {isData && renderMasterCards({ data, refToLoadData })}
        {isLoading && <div className="search__spinner spinner" />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const getMasters = async (user) => {
    if (user.id) return await User.findMastersWithFavorites(user.id);
    return await User.findMasters();
  };

  const data = await handlePublicAndAuthPage(getMasters, { req, res, store });

  const { masters, favoriteMasters } = data;

  store.dispatch(getFavorites(favoriteMasters || []));

  return { props: { masters: masters || [] } };
});

export default Search;
