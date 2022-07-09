import { useDispatch, useSelector } from 'react-redux';
import { setAppointmentService } from '../../../../../../../../../../redux/appointments/actions';

const useHandleSubmit = (setStep) => {
  const service = useSelector((state) => state.appointments.booking.bookingAppointment.service);

  const dispatch = useDispatch();
  const goToTimetable = () => setStep(2);
  const handleSubmit = (values) => {
    dispatch(setAppointmentService({ ...service, duration: values.duration, isAfterUpdate: true }));
    goToTimetable();
  };

  return handleSubmit;
};

export default useHandleSubmit;
