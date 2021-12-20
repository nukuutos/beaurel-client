import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../../../../../../../../../redux/appointments/actions';

const useClick = (setStep, appointmentData) => {
  const dispatch = useDispatch();
  const { date, availableAppointments, unavailableAppointments } = appointmentData;

  const handleClick = (availableTimeIndex) => () => {
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

  return [handleClick];
};

export default useClick;
