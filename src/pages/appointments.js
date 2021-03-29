import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import handleAuth from '../utils/handle-auth';
import AppointmentModel from '../server/models/appointment';
import { setMasterAppointments } from '../redux/appointments/actions';
import AppointmentsCategoriesController from '../components/appointments/appointments-categories-controller';
import AppointmentController from '../components/appointments/appointment-controller';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import renderApointment from '../components/appointments/appointment/utils/render-appointment';

const Appointments = () => {
  const [category, setCategory] = useState('onConfirmation');
  const { masterAppointments } = useSelector((state) => state.appointments);

  return (
    <Layout>
      <main className="content card card--layout">
        <AppointmentController />
        <AppointmentsCategoriesController categoryState={[category, setCategory]} />

        {masterAppointments[category].map((appointment, i) => renderApointment(appointment, category, i))}

        {!masterAppointments[category].length && (
          <div className="appointments__noappointments card mt-8">Записи отсутствуют</div>
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const userId = await handleAuth(req, res, store);

  const appointments = await AppointmentModel.getMasterAppointmentsAndCustomers(userId, 'onConfirmation');

  store.dispatch(setMasterAppointments({ appointments, type: 'onConfirmation' }));
  // store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { custom: 'custom' } };
});

export default Appointments;
