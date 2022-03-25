import { useSelector } from 'react-redux';
import useGetAppointmentsOnScroll from '../../use-get-appointments-on-scroll';
import { getAppointmentComponentByUser, getIsAbleToFetch, getIsLastAppointment } from './utils';

const Appointments = ({ user, category }) => {
  const { appointments: appointmentsState } = useSelector((state) => state.appointments);
  const [appointmentRef] = useGetAppointmentsOnScroll({ user, category });
  const { appointments } = appointmentsState[user][category];

  const days = [];

  const dates = Object.keys(appointments);
  const lastDate = dates[dates.length - 1];

  const isAbleToFetch = getIsAbleToFetch(appointments);

  for (const date in appointments) {
    const AppointmentComponent = getAppointmentComponentByUser(user);

    const isLastDate = date === lastDate;
    const appointmentsDayLength = appointments[date].length;

    const appointmentsForRender = appointments[date].map((appointment, i) => {
      const isLastAppointmentOnDay = appointmentsDayLength - 1 === i;
      const isLastAppointment = getIsLastAppointment({
        isAbleToFetch,
        isLastDate,
        isLastAppointmentOnDay,
      });

      if (isLastAppointment) {
        return (
          <AppointmentComponent
            lastAppointmentRef={appointmentRef}
            user={user}
            appointment={appointment}
            category={category}
          />
        );
      }

      return <AppointmentComponent user={user} appointment={appointment} category={category} />;
    });

    days.push(
      <div key={date} className="appointments__day mt-8">
        <span className="appointments__date ml-1">{date}</span>
        {[...appointmentsForRender]}
      </div>
    );
  }

  return days;
};

export default Appointments;
