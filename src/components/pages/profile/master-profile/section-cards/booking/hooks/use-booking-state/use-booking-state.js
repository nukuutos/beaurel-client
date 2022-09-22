import { useReducer } from 'react';

import getInitialState from './get-initial-state';
import reducer from './reducer';
import {
  BACK_TO_SERVICES,
  BACK_TO_TIMETABLE,
  FROM_RESULT_TO_SERVICES,
  FROM_RESULT_TO_TIMETABLE,
  GO_TO_SUCCESS,
  PICK_DATE,
  PICK_SERVICE,
  UNSET_APPOINTMENT,
} from './types';

const useBookingState = ({ isService, isTimetable, onClickClose }) => {
  const initialState = getInitialState({ isService, isTimetable });

  const [state, dispatch] = useReducer(reducer, initialState);

  const backToTimetable = () => dispatch({ type: BACK_TO_TIMETABLE });
  const backToServices = () => dispatch({ type: BACK_TO_SERVICES });
  const fromResultToServices = () => dispatch({ type: FROM_RESULT_TO_SERVICES });
  const fromResultToTimetable = () => dispatch({ type: FROM_RESULT_TO_TIMETABLE });
  const unsetAppointment = () => dispatch({ type: UNSET_APPOINTMENT });
  const goToSuccess = () => dispatch({ type: GO_TO_SUCCESS });

  const getPickService =
    ({ id, title, duration, isAfterUpdate }) =>
    () => {
      dispatch({ type: PICK_SERVICE, payload: { id, title, duration, isAfterUpdate } });
    };

  const getPickDate =
    ({ availableTimeIndex, appointmentData }) =>
    () => {
      const { date, availableAppointments, unavailableAppointments } = appointmentData;
      const payload = {
        date,
        time: availableAppointments[availableTimeIndex],
        availableAppointments,
        unavailableAppointments,
      };

      dispatch({ type: PICK_DATE, payload });
    };

  const backFromBookingResult = () => {
    const { lastStepName } = state;
    if (lastStepName === 'service') fromResultToServices();
    else fromResultToTimetable();
  };

  const close = () => {
    onClickClose();
    unsetAppointment();
  };

  const closeServices = state.step === 2 ? backToTimetable : close;
  const closeTimetable = state.step === 2 ? backToServices : close;

  const actions = {
    close,
    closeServices,
    closeTimetable,
    backFromBookingResult,
    getPickDate,
    getPickService,
    goToSuccess,
  };

  return [state, actions];
};

export default useBookingState;
