import Appointment from '../base/appointment';
import useChangeStatus from '../utils/use-change-status';

const ConfirmedAppointment = ({ user, appointment, lastAppointmentRef = null }) => {
  const [cancel, isLoading] = useChangeStatus({ appointment, status: 'rejected', user: 'master' });
  const loadingClassName = isLoading ? 'btn--disabled btn--spinner' : '';

  return (
    <Appointment
      className="appointments__appointment-card"
      user={user}
      appointment={appointment}
      lastAppointmentRef={lastAppointmentRef}
    >
      <div className="appointment-card__buttons">
        <div
          onClick={cancel}
          className={`btn btn--primary btn--flat btn--fail ${loadingClassName}`}
        >
          Отменить
        </div>
      </div>
    </Appointment>
  );
};

export default ConfirmedAppointment;
