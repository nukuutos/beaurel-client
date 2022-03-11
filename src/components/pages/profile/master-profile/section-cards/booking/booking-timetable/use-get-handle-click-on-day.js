import { useDispatch } from 'react-redux';
import { setAppointmentDate } from '../../../../../../../redux/appointments/actions';

const useGetHandleClickOnDay = (setStep) => {
  const dispatch = useDispatch();

  const toServices = (state) => ({
    ...state,
    isTimetable: false,
    isService: true,
    step: state.step + 1,
    lastStepName: 'timetable',
  });

  const toBookingResult = (state) => ({
    ...state,
    isTimetable: false,
    isResult: true,
    step: state.step + 1,
    lastStepName: 'timetable',
  });

  const getHandleClickOnDay =
    ({ availableTimeIndex, appointmentData }) =>
    () => {
      const { date, availableAppointments, unavailableAppointments } = appointmentData;

      setStep((state) => {
        if (state.step === 1) return toServices(state);
        return toBookingResult(state);
      });

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
