import { wrapper } from '../../redux/store';
import { getTimetableSuccess } from '../../redux/timetable/actions';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import Timetable from '../models/timetable';
import handleGlobalState from './utils/handle-global-state';

const getTimetableServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const user = await handleAuthPage(req, res, store);

  const { globalData, ...timetable } = await Timetable.getData(user.id);

  handleGlobalState({ user, globalData, store });

  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: {} };
});

export default getTimetableServerSideProps;
