import OnConfirmationAppointment from './customer/on-confirmation-appointment';
import ReviewAppointment from './customer/review-appointment/review-appointment';

const CustomerAppointment = ({ appointment, category }) => {
  switch (category) {
    case 'onConfirmation':
      return <OnConfirmationAppointment appointment={appointment} />;
    case 'confirmed':
      return <OnConfirmationAppointment appointment={appointment} />;
    case 'history':
      return <ReviewAppointment appointment={appointment} />;
    case 'unsuitable':
      return <OnConfirmationAppointment appointment={appointment} />;
    default:
      break;
  }
};

export default CustomerAppointment;
