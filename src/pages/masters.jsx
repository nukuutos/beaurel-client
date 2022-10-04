import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';

import getMastersServerSideProps from '../server/get-server-side-props/masters';

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
