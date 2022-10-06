import { getServices } from '../../redux/slices/service/service';
import { wrapper } from '../../redux/store';
import { getTimetable } from '../../redux/slices/timetable';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import Service from '../models/service';
import handleGlobalState from './utils/handle-global-state';

const getServicesServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const user = await handleAuthPage(req, res, store);

  if (user?.role !== 'master') {
    res.statusCode = 302;
    res.setHeader('Location', `/not-found`); // Replace <link> with your url link
    return;
  }

  const { services, timetable, globalData } = await Service.getServices(user.id);
  store.dispatch(getServices({ services, masterId: user.id }));
  store.dispatch(getTimetable({ timetable }));

  handleGlobalState({ user, globalData, store });

  return { props: { custom: 'custom' } };
});
export default getServicesServerSideProps;
