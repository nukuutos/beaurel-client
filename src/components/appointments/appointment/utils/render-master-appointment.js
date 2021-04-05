import OnConfirmationAppointment from '../master/on-confirmation-appointment';
import ConfimedAppointment from '../master/confirmed-appointment';
import ReviewAppointment from '../master/review-appointment';
import UnsuitableAppointment from '../master/unsuitable-appointment';

const renderMasterAppointment = (appointment, category, i) => {
  switch (category) {
    case 'onConfirmation':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;
    case 'confirmed':
      return <ConfimedAppointment appointment={appointment} key={i} />;
    case 'history':
      return <ReviewAppointment appointment={appointment} key={i} />;
    case 'unsuitable':
      return <UnsuitableAppointment appointment={appointment} key={i} />;

    default:
      break;
  }
};

export default renderMasterAppointment;
