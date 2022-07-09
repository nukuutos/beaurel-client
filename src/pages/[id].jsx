import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import Layout from '../components/layout/layout';

import getProfileServerSideProps from '../server/get-server-side-props/profile';

const Header = dynamic(() => import('../components/pages/profile/header/header'));

const MasterProfile = dynamic(() =>
  import('../components/pages/profile/master-profile/master-profile')
);

const CustomerProfile = dynamic(() =>
  import('../components/pages/profile/customer-profile/customer-profile')
);

const Profile = () => {
  const { role } = useSelector((state) => state.profile);

  const isMaster = role === 'master';

  return (
    <Layout>
      <main className="content">
        <Header />
        {isMaster ? <MasterProfile /> : <CustomerProfile />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = getProfileServerSideProps;

export default Profile;
