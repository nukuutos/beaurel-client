import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import CreateTimetable from '../components/pages/timetable/create-timetable/create-timetable';
import getTimetableServerSideProps from '../server/get-server-side-props/timetable';
import DisplayTimetable from '../components/pages/timetable/display-timetable/display-timetable';

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
