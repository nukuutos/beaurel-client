import { useState, useRef } from 'react';
import Layout from '../components/layout/layout';

import useSearch from '../components/pages/search/use-search';
import useOnSubmit from '../components/pages/search/use-on-submit';
import SearchForm from '../components/pages/search/search-form';
import NoMasters from '../components/pages/search/no-masters';
import getSearchServerSideProps from '../server/get-server-side-props/search';
import useMasterTools from '../components/pages/search/use-master-tools';
import NoMasterTools from '../components/pages/search/no-master-tools';
import DisplayMasterCards from '../components/pages/search/display-master-cards';

const Search = ({ masters }) => {
  const [data, setData] = useState(masters);
  const isMasterTools = useMasterTools();

  const form = useRef();
  const [refToLoadData, { page, hasMore }, isLoadingOnScroll] = useSearch(form, setData);
  const [handleSubmit, isLoadingOnType, cancelSubmit] = useOnSubmit({ setData, hasMore, page });

  const isLoading = isLoadingOnType || isLoadingOnScroll;
  const isData = !!data.length;

  return (
    <Layout>
      <main className="content">
        <h1 className="search__heading heading">Найти мастера</h1>
        <SearchForm form={form} handleSubmit={handleSubmit} cancelSubmit={cancelSubmit} />
        {!isMasterTools && <NoMasterTools />}
        {!isData && !isLoading && <NoMasters />}
        {isData && <DisplayMasterCards data={data} refToLoadData={refToLoadData} />}
        {isLoading && <div className="search__spinner spinner" />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = getSearchServerSideProps;

export default Search;
