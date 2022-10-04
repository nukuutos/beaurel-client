import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import getTimetableServerSideProps from '../server/get-server-side-props/timetable';

const DisplayTimetable = dynamic(() =>
  import('../components/pages/timetable/display-timetable/display-timetable')
);

const CreateTimetable = dynamic(() =>
  import('../components/pages/timetable/create-timetable/create-timetable')
);

const Timetable = () => {
  const { _id: isTimetable } = useSelector((state) => state.timetable);

  return (
    <Layout>
      <main className="content">{isTimetable ? <DisplayTimetable /> : <CreateTimetable />}</main>
    </Layout>
  );
};

export const getServerSideProps = getTimetableServerSideProps;

export default Timetable;
