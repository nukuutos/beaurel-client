import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import MasterProfile from '../components/pages/profile/master-profile/master-profile';
import CustomerProfile from '../components/pages/profile/customer-profile/customer-profile';
import getProfileServerSideProps from '../server/get-server-side-props/profile';
import Header from '../components/pages/profile/header/header';

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
