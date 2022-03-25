import { useDispatch } from 'react-redux';

import {
  unsetAppointment,
  unsetAppointmentDate,
} from '../../../../../../../../../../redux/appointments/actions';

const useCreateBackFunctions = (setStep, onClickClose) => {
  const dispatch = useDispatch();

  const onClose = () => {
    onClickClose();
    dispatch(unsetAppointment());
  };

  const backToTimetable = () => {
    dispatch(unsetAppointmentDate());
    setStep(2);
  };

  const backToServices = () => {
    setStep(1);
  };

  return { onClose, backToTimetable, backToServices };
};

export default useCreateBackFunctions;
