import { setAppointments } from '../../redux/appointments/actions';
import { wrapper } from '../../redux/store';
import handleAuthPage from '../../utils/auth/handle-auth-page/handle-auth-page';
import Appointment from '../models/appointment';
import handleGlobalState from './utils/handle-global-state';

const getAppointmentsServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const user = await handleAuthPage(req, res, store);
  const data = await Appointment.getAppointments(user, 'onConfirmation');
  const { globalData } = data;

  handleGlobalState({ globalData, user, store });

  store.dispatch(
    setAppointments({
      appointments: data.appointments || {},
      type: 'onConfirmation',
      user: user.role,
    })
  );

  Appointment.setAppointmentViewed(user.id);

  return { props: { custom: 'custom' } };
});

export default getAppointmentsServerSideProps;
