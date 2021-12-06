import { useDispatch } from 'react-redux';

import {
  unsetAppointment,
  unsetAppointmentDate,
  unsetAppointmentService,
} from '../../../../../redux/appointments/actions';

const useCreateBackFunctions = (stepState, onClickClose) => {
  const [step, setStep] = stepState;
  const dispatch = useDispatch();

  const onClose = () => {
    onClickClose();
    dispatch(unsetAppointment());
  };

  const backToTimetable = () => {
    dispatch(unsetAppointmentDate());
    setStep((state) => ({
      ...state,
      isTimetable: true,
      isService: false,
      step: state.step - 1,
    }));
  };

  const backToServices = () => {
    dispatch(unsetAppointmentService());
    setStep((state) => ({
      ...state,
      isService: true,
      isTimetable: false,
      step: state.step - 1,
    }));
  };

  const backFromBookingResult = () => {
    const backToServicesFromBookingResult = (state) => {
      dispatch(unsetAppointmentService());
      return { ...state, isResult: false, isService: true, step: state.step - 1 };
    };

    const backToTimetableFromBookingResult = (state) => {
      dispatch(unsetAppointmentDate());
      return { ...state, isResult: false, isTimetable: true, step: state.step - 1 };
    };

    setStep((state) => {
      if (state.lastStepName === 'service') return backToServicesFromBookingResult(state);
      return backToTimetableFromBookingResult(state);
    });
  };

  const closeServices = step.step === 2 ? backToTimetable : onClose;
  const closeTimetable = step.step === 2 ? backToServices : onClose;

  return { onClose, closeServices, closeTimetable, backFromBookingResult };
};

export default useCreateBackFunctions;
