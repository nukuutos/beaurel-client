import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import handleAuth from '../utils/handle-auth';
import AppointmentModel from '../server/models/appointment';
import { setAppointments } from '../redux/appointments/actions';
import AppointmentsCategoriesController from '../components/appointments/appointments-categories-controller';
import AppointmentController from '../components/appointments/appointment-controller';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import renderMasterAppointment from '../components/appointments/appointment/utils/render-master-appointment';
import useAsyncAction from '../hooks/useAsyncAction';
import renderCustomerAppointment from '../components/appointments/appointment/utils/render-customer-appointment';

const Appointments = () => {
  const [{ user, category }, setState] = useState({ user: 'master', category: 'onConfirmation' });
  const [{ appointments: appointmentsState }, { id: profileId, accessToken }] = useSelector((state) => [
    state.appointments,
    state.auth,
  ]);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const { appointments, isLoaded } = appointmentsState[user][category];

  const getMasterAppointments = async (category) => {
    const config = {
      method: 'get',
      url: `/profile/${profileId}/appointment/${user}?category=${category}`,
      accessToken,
    };

    const { appointments } = await asyncAction(config);

    if (appointments) {
      dispatch(setAppointments({ appointments, type: category, user }));
    }
  };

  useEffect(() => {
    if (!isLoaded) getMasterAppointments(category);
  }, [category, user]);

  return (
    <Layout>
      <main className="content card card--layout">
        {isLoading && <div className="spinner-with-background" />}
        <AppointmentController userState={[user, setState]} />
        <AppointmentsCategoriesController categoryState={[category, setState]} />

        {user === 'master'
          ? appointments.map((appointment, i) => renderMasterAppointment(appointment, category, i))
          : appointments.map((appointment, i) => renderCustomerAppointment(appointment, category, i))}

        {!appointments.length && <div className="appointments__noappointments card mt-8">Записи отсутствуют</div>}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const userId = await handleAuth(req, res, store);

  const appointments = await AppointmentModel.getMasterAppointmentsAndCustomers(userId, 'onConfirmation');

  store.dispatch(setAppointments({ appointments, type: 'onConfirmation', user: 'master' }));
  // store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { custom: 'custom' } };
});

export default Appointments;
