import OnConfirmationAppointment from './master/on-confirmation-appointment';
import ConfirmedAppointment from './master/confirmed-appointment';
import ReviewAppointment from './master/review-appointment/review-appointment';
import UnsuitableAppointment from './master/unsuitable-appointment/unsuitable-appointment';

const MasterAppointment = ({ user, appointment, category, lastAppointmentRef }) => {
  switch (category) {
    case 'onConfirmation':
      return (
        <OnConfirmationAppointment
          lastAppointmentRef={lastAppointmentRef}
          user={user}
          appointment={appointment}
        />
      );
    case 'confirmed':
      return (
        <ConfirmedAppointment
          lastAppointmentRef={lastAppointmentRef}
          user={user}
          appointment={appointment}
        />
      );
    case 'history':
      return (
        <ReviewAppointment
          lastAppointmentRef={lastAppointmentRef}
          user={user}
          appointment={appointment}
        />
      );
    case 'unsuitable':
      return (
        <UnsuitableAppointment
          lastAppointmentRef={lastAppointmentRef}
          user={user}
          appointment={appointment}
        />
      );
    default:
      return null;
  }
};

export default MasterAppointment;
