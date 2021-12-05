import { setAppointmentService } from '../../../../../redux/appointments/actions';

const goTo = (setStep, service, dispatch) => {
  const goToBookingResult = (state) => ({
    ...state,
    isService: false,
    isResult: true,
    step: state.step + 1,
    lastStepName: 'service',
  });

  const goToTimetable = (state) => ({
    ...state,
    isService: false,
    isTimetable: true,
    step: state.step + 1,
    lastStepName: 'service',
  });

  const handleOnClick = () => {
    const { id, title, duration } = service;

    dispatch(setAppointmentService({ id, title, duration }));

    setStep((state) => {
      if (state.step === 2) return goToBookingResult(state);
      return goToTimetable(state);
    });
  };

  return handleOnClick;
};

export default goTo;
