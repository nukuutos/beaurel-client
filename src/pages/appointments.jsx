import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import useGetAppointments from '../components/pages/appointments/use-get-appointments';
import getAppointmentsServerSideProps from '../server/get-server-side-props/appointments';

import Layout from '../components/layout/layout';
import useAppointmentsState from '../components/pages/appointments/use-appointments-state';

const NoAppointments = dynamic(() => import('../components/pages/appointments/no-appointments'));

const AppointmentsCategoriesController = dynamic(() =>
  import(
    '../components/pages/appointments/appointment-categories-controller/appointments-categories-controller'
  )
);

const AppointmentController = dynamic(() =>
  import('../components/pages/appointments/appointments-controller/appointments-controller')
);

const AppointmentsDays = dynamic(() =>
  import('../components/pages/appointments/appointment-days/appointments-days')
);

const Appointments = () => {
  const { role } = useSelector((state) => state.auth);
  // const [state, setState] = useState({ user: role, category: 'onConfirmation' });
  const [state, actions] = useAppointmentsState();
  const [appointments, isLoading] = useGetAppointments(state);

  const isAppointments = Object.keys(appointments).length;

  return (
    <Layout>
      <main className="content">
        {role === 'customer' && <h1 className="appointments__heading heading mt-8">Ваши записи</h1>}
        {role === 'master' && <AppointmentController state={state} {...actions} />}
        <AppointmentsCategoriesController state={state} {...actions} />
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
