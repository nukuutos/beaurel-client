import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import getServicesServerSideProps from '../server/get-server-side-props/services';

const ServicesCase = dynamic(() => import('../components/pages/services/services-case'));
const NoTimetableCase = dynamic(() => import('../components/pages/services/no-timetable'));

const Services = () => {
  const { sessionTime: isTimetable } = useSelector((state) => state.timetable);

  return (
    <Layout>
      <main className="content">
        <h1 className="services__heading heading mt-8">Услуги</h1>
        {isTimetable ? <ServicesCase /> : <NoTimetableCase />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = getServicesServerSideProps;

export default Services;
