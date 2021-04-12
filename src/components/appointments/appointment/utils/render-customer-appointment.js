import OnConfirmationAppointment from '../customer/on-confirmation-appointment';
import ReviewAppointment from '../customer/review-appointment/review-appointment';

const renderCustomerAppointment = (appointment, category, i) => {
  switch (category) {
    case 'onConfirmation':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;
    case 'confirmed':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;
    case 'history':
      return <ReviewAppointment appointment={appointment} key={i} />;
    case 'unsuitable':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;

    default:
      break;
  }
};

export default renderCustomerAppointment;
