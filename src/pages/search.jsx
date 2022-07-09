import { useState, useRef } from 'react';

import dynamic from 'next/dynamic';
import useSearch from '../components/pages/search/use-search';
import useOnSubmit from '../components/pages/search/use-on-submit';
import useMasterTools from '../components/pages/search/use-master-tools';

import getSearchServerSideProps from '../server/get-server-side-props/search';

import Layout from '../components/layout/layout';

const SearchForm = dynamic(() => import('../components/pages/search/search-form'));
const NoMasters = dynamic(() => import('../components/pages/search/no-masters'));
const NoMasterTools = dynamic(() => import('../components/pages/search/no-master-tools'));
const DisplayMasterCards = dynamic(() => import('../components/pages/search/display-master-cards'));

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
