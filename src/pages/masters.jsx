import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
// import DisplayMasters from '../components/pages/masters/display-masters';
// import NoMasters from '../components/pages/masters/no-masters';

import getMastersServerSideProps from '../server/get-server-side-props/masters';

// const Layout = dynamic(() => import('../components/layout/layout'));
const DisplayMasters = dynamic(() => import('../components/pages/masters/display-masters'));
const NoMasters = dynamic(() => import('../components/pages/masters/no-masters'));

const Masters = () => {
  const favorites = useSelector((state) => state.favorites);

  const isMasters = favorites.length;

  return (
    <Layout>
      <main className="content">
        <h1 className="masters__heading heading">Твои Мастера</h1>
        {isMasters ? <DisplayMasters /> : <NoMasters />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = getMastersServerSideProps;

export default Masters;
