import OnConfirmationAppointment from './master/on-confirmation-appointment';
import ConfirmedAppointment from './master/confirmed-appointment';
import ReviewAppointment from './master/review-appointment';
import UnsuitableAppointment from './master/unsuitable-appointment';

const renderMasterAppointment = ({ appointment, category }) => {
  switch (category) {
    case 'onConfirmation':
      return <OnConfirmationAppointment appointment={appointment} />;
    case 'confirmed':
      return <ConfirmedAppointment appointment={appointment} />;
    case 'history':
      return <ReviewAppointment appointment={appointment} />;
    case 'unsuitable':
      return <UnsuitableAppointment appointment={appointment} />;
    default:
      return null;
  }
};

export default renderMasterAppointment;
