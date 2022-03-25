import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../../../../../../../redux/appointments/actions';

const useGetHandleClickOnDay = (setStep) => {
  const dispatch = useDispatch();

  const getHandleClickOnDay =
    ({ availableTimeIndex, appointmentData }) =>
    () => {
      const { date, availableAppointments, unavailableAppointments } = appointmentData;

      setStep(3);

      dispatch(
        setAppointmentDate({
          date,
          time: availableAppointments[availableTimeIndex],
          availableAppointments,
          unavailableAppointments,
        })
      );
    };

  return getHandleClickOnDay;
};

export default useGetHandleClickOnDay;
