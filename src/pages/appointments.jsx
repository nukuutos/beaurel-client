import { useSelector } from 'react-redux';
import { useState } from 'react';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import AppointmentModel from '../server/models/appointment';
import { setAppointments } from '../redux/appointments/actions';
import AppointmentsCategoriesController from '../components/pages/appointments/appointment-categories-controller/appointments-categories-controller';
import AppointmentController from '../components/pages/appointments/appointments-controller/appointments-controller';
import handleAuthPage from '../utils/auth/handle-auth-page/handle-auth-page';
import useGetAppointments from '../components/pages/appointments/use-get-appointments';
import DisplayAppointments from '../components/pages/appointments/display-appointments/display-appointments';
import NoAppointments from '../components/pages/appointments/no-appointments';

const Appointments = () => {
  const [state, setState] = useState({ user: 'master', category: 'onConfirmation' });
  const [appointments, isLoading] = useGetAppointments(state);
  const { isPhone } = useSelector((state) => state.screenSize);

  const isAppointments = !!Object.keys(appointments).length;

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        {isLoading && <div className="spinner-with-background" />}
        <AppointmentController userState={[state.user, setState]} />
        <AppointmentsCategoriesController categoryState={[state.category, setState]} />
        {isAppointments ? <DisplayAppointments state={state} /> : <NoAppointments />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const user = await handleAuthPage(req, res, store);

  const appointments = await AppointmentModel.getMasterAppointmentsAndCustomers(
    user.id,
    'onConfirmation'
  );

  store.dispatch(setAppointments({ appointments, type: 'onConfirmation', user: 'master' }));

  return { props: { custom: 'custom' } };
});

export default Appointments;
