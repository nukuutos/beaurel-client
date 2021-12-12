import { useSelector } from 'react-redux';
import CustomerAppointment from './appointment/customer-appointment';
import MasterAppointment from './appointment/master-appointment';

const Appointments = ({ user, category }) => {
  const [{ appointments: appointmentsState }, { isPhone }] = useSelector((state) => [
    state.appointments,
    state.screenSize,
  ]);

  const { appointments } = appointmentsState[user][category];

  const days = [];

  for (const date in appointments) {
    const AppointmentComponent = user === 'master' ? MasterAppointment : CustomerAppointment;

    const renderedAppointments = appointments[date].map((appointment) => (
      <AppointmentComponent appointment={appointment} category={category} />
    ));

    days.push(
      <div key={date} className="appointments__day mt-8">
        {!isPhone && <span className="appointments__date ml-1">{date}</span>}
        {[...renderedAppointments]}
      </div>
    );
  }

  return days;
};

export default Appointments;
