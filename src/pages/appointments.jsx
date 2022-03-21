import { useSelector } from 'react-redux';
import { useState } from 'react';
import Layout from '../components/layout/layout';
import AppointmentsCategoriesController from '../components/pages/appointments/appointment-categories-controller/appointments-categories-controller';
import AppointmentController from '../components/pages/appointments/appointments-controller/appointments-controller';
import useGetAppointments from '../components/pages/appointments/use-get-appointments';
import NoAppointments from '../components/pages/appointments/no-appointments';
import getAppointmentsServerSideProps from '../server/get-server-side-props/appointments';
import AppointmentsDays from '../components/pages/appointments/appointment-days/appointments-days';

const Appointments = () => {
  const { role } = useSelector((state) => state.auth);
  const [state, setState] = useState({ user: role, category: 'onConfirmation' });
  const [appointments, isLoading] = useGetAppointments(state);

  const isAppointments = Object.keys(appointments).length;

  return (
    <Layout>
      <main className="content">
        {role === 'customer' && <h1 className="appointments__heading heading mt-8">Ваши записи</h1>}
        {role === 'master' && <AppointmentController userState={[state.user, setState]} />}
        <AppointmentsCategoriesController categoryState={[state, setState]} />
        {isLoading || isAppointments ? (
          <AppointmentsDays isLoading={isLoading} state={state} />
        ) : (
          <NoAppointments />
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = getAppointmentsServerSideProps;

export default Appointments;
