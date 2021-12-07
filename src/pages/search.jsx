import { useState, useRef } from 'react';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { getMastersSuccess } from '../redux/profile/actions';
import User from '../server/models/user';
import handlePublicAndAuthPage from '../utils/auth/handle-public-and-auth-page/handle-public-and-auth-page';
import useSearch from '../components/pages/search/use-search';
import useMediaQuery from '../hooks/use-media-query';
import useOnSubmit from '../components/pages/search/use-on-submit';
import SearchForm from '../components/pages/search/search-form';
import renderMasterCards from '../components/pages/search/render-master-cards';
import NoMasters from '../components/pages/search/no-masters';

const Search = ({ masters }) => {
  const [data, setData] = useState(masters);

  const form = useRef();

  const [refToLoadData, { page, hasMore }, isLoadingOnScroll] = useSearch(form, setData);
  const [handleSubmit, isLoadingOnType, cancelSubmit] = useOnSubmit({ setData, hasMore, page });

  const isLoading = isLoadingOnType || isLoadingOnScroll;
  const isData = data.length;

  const isMobile = useMediaQuery(600);

  return (
    <Layout>
      <main className={`content ${!isMobile ? 'card card--layout' : ''}`}>
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
  const getMasters = async (userId) => {
    if (userId) return await User.findMastersWithFavorites(userId);
    return await User.findMasters();
  };

  const data = await handlePublicAndAuthPage(getMasters, { req, res, store });

  const { masters, favoriteMasters } = data;

  store.dispatch(getMastersSuccess({ favoriteMasters }));

  return { props: { masters } };
});

export default Search;
