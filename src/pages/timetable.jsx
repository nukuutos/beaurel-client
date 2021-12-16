import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import TimetableModel from '../server/models/timetable';
import { getTimetableSuccess } from '../redux/timetable/actions';
import VisualUpdatedTimetable from '../components/pages/timetable/visual-updated-timetable/visual-updated-timetable';
import handleAuthPage from '../utils/auth/handle-auth-page/handle-auth-page';
import TimetableForm from '../components/pages/timetable/timetable-form/timetable-form';

const Timetable = () => {
  // if we've got update => disable edit every element
  // we editing something => disable other elements

  const [{ update }, { isPhone }] = useSelector((state) => [state.timetable, state.screenSize]);

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        <h1 className="timetable__heading heading mt-8 ">Расписание</h1>

        <TimetableForm />

        {update.date && <VisualUpdatedTimetable />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const userId = await handleAuthPage(req, res, store);

  const timetable = await TimetableModel.findOne({ masterId: userId });

  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: {} };
});

export default Timetable;
