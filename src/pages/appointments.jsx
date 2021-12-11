import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import AppointmentModel from '../server/models/appointment';
import { setAppointments } from '../redux/appointments/actions';
import AppointmentsCategoriesController from '../components/pages/appointments/appointments-categories-controller';
import AppointmentController from '../components/pages/appointments/appointment-controller';
import useAsyncAction from '../hooks/use-async-action/use-async-action';
import handleAuthPage from '../utils/auth/hande-auth-page/handle-auth-page';
import { useCarousel } from '../components/pages/appointments/use-carousel/use-carousel';
import AppointmentsDots from '../components/pages/appointments/appointments-dots';
import AppointmentsDays from '../components/pages/appointments/appointments-days';

const Appointments = () => {
  const [{ user, category }, setState] = useState({ user: 'master', category: 'onConfirmation' });
  const [{ appointments: appointmentsState }, { id: profileId, accessToken }, { isPhone }] =
    useSelector((state) => [state.appointments, state.auth, state.screenSize]);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const { appointments, isLoaded } = appointmentsState[user][category];

  const days = Object.keys(appointments);
  const daysNumber = days.length;
  const [active, handlers, styles, direction] = useCarousel(days.length);

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

  const renderArguments = [appointments, user, category];

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        {isLoading && <div className="spinner-with-background" />}
        <AppointmentController userState={[user, setState]} />

        <AppointmentsCategoriesController categoryState={[category, setState]} />

        {isPhone && (
          <AppointmentsDots
            days={days}
            daysNumber={daysNumber}
            active={active}
            direction={direction}
          />
        )}

        {!!daysNumber && (
          <AppointmentsDays style={styles} handlers={handlers} renderArguments={renderArguments} />
        )}

        {!daysNumber && (
          <div className="appointments__noappointments card mt-8">Записи отсутствуют</div>
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const userId = await handleAuthPage(req, res, store);

  const appointments = await AppointmentModel.getMasterAppointmentsAndCustomers(
    userId,
    'onConfirmation'
  );

  store.dispatch(setAppointments({ appointments, type: 'onConfirmation', user: 'master' }));
  // store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { custom: 'custom' } };
});

export default Appointments;
