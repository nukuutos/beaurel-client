import OnConfirmationAppointment from '../on-confirmation-appointment';
import ConfimedAppointment from '../confirmed-appointment';

const renderApointment = (appointment, category, i) => {
  switch (category) {
    case 'onConfirmation':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;
    case 'confirmed':
      return <ConfimedAppointment appointment={appointment} key={i} />;
    case 'history':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;
    case 'unsuitable':
      return <OnConfirmationAppointment appointment={appointment} key={i} />;

    default:
      break;
  }
};

export default renderApointment;
