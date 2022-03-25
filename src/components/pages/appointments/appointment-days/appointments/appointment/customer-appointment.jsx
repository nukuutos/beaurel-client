import OnConfirmationAppointment from './customer/on-confirmation-appointment';
import ReviewAppointment from './customer/review-appointment/review-appointment';

const CustomerAppointment = ({ appointment, user, category, lastAppointmentRef }) => {
  switch (category) {
    case 'onConfirmation':
      return (
        <OnConfirmationAppointment
          user={user}
          appointment={appointment}
          lastAppointmentRef={lastAppointmentRef}
        />
      );
    case 'confirmed':
      return (
        <OnConfirmationAppointment
          user={user}
          appointment={appointment}
          lastAppointmentRef={lastAppointmentRef}
        />
      );
    case 'history':
      return (
        <ReviewAppointment
          user={user}
          appointment={appointment}
          lastAppointmentRef={lastAppointmentRef}
        />
      );
    case 'unsuitable':
      return (
        <OnConfirmationAppointment
          user={user}
          appointment={appointment}
          lastAppointmentRef={lastAppointmentRef}
        />
      );
    default:
      break;
  }
};

export default CustomerAppointment;
