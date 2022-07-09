import { useSelector } from 'react-redux';
import getInputClassName from '../../../../../../../../../../services/services-updates/update-services/update-services-from/shared/get-input-class-name';
import displayDuration from '../../../../../../../../../../utils/display-duration';
import useCorrectSessionTime from '../../use-session-time';

const useDuration = (values) => {
  const service = useSelector((state) => state.appointments.booking.bookingAppointment.service);
  const { correctSessionTime, isUpdateSessionTime } = useCorrectSessionTime();

  const durationClassName = getInputClassName(values.duration, correctSessionTime);
  const initialDuration = displayDuration(service?.duration);

  return { initialDuration, durationClassName, isUpdateSessionTime };
};

export default useDuration;
