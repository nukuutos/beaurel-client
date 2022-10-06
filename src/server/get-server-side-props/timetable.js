import { wrapper } from '../../redux/store';
import { getTimetable } from '../../redux/slices/timetable';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import Timetable from '../models/timetable';
import handleGlobalState from './utils/handle-global-state';

const getTimetableServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const user = await handleAuthPage(req, res, store);

  if (!user || user.role !== 'master') {
    res.statusCode = 302;
    res.setHeader('Location', `/not-found`); // Replace <link> with your url link
    return;
  }

  const { globalData, ...timetable } = await Timetable.getData(user.id);

  handleGlobalState({ user, globalData, store });

  store.dispatch(getTimetable({ timetable }));

  return { props: {} };
});

export default getTimetableServerSideProps;
