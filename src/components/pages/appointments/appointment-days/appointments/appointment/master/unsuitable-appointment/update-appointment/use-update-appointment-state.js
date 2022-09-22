import { useCallback, useReducer } from 'react';

const initialState = {
  step: 1,
  date: null,
  time: null,
  availableAppointments: [],
  unavailableAppointments: [],
  service: null,
};

const BACK_TO_TIMETABLE = 'BACK_TO_TIMETABLE';
const BACK_TO_SERVICES = 'BACK_TO_SERVICES';
const SET_SERVICE = 'SET_SERVICE';
const PICK_DATE = 'PICK_DATE';
const UNSET_APPOINTMENT = 'UNSET_APPOINTMENT';
const GO_TO_SUCCESS = 'GO_TO_SUCCESS';
const UPDATE_DURATION = 'UPDATE_DURATION';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case BACK_TO_TIMETABLE: {
      return {
        ...state,
        step: 2,
        date: null,
        time: null,
        availableAppointments: [],
        unavailableAppointments: [],
      };
    }

    case BACK_TO_SERVICES: {
      return {
        ...state,
        step: 1,
      };
    }

    case SET_SERVICE: {
      return {
        ...state,
        service: { ...payload },
      };
    }

    case UPDATE_DURATION: {
      return {
        ...state,
        step: 2,
        service: { ...state.service, duration: payload, isAfterUpdate: true },
      };
    }

    case PICK_DATE: {
      return {
        ...state,
        ...payload,
        step: 3,
      };
    }

    case UNSET_APPOINTMENT: {
      return {
        ...state,
        date: null,
        time: null,
        availableAppointments: [],
        unavailableAppointments: [],
        service: null,
      };
    }

    case GO_TO_SUCCESS:
      return { ...state, step: 4 };

    default:
      return state;
  }
};

const useUpdateAppointmentState = (onClickClose) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const backToServices = () => dispatch({ type: BACK_TO_SERVICES });
  const backToTimetable = () => dispatch({ type: BACK_TO_TIMETABLE });
  const unsetAppointment = () => dispatch({ type: UNSET_APPOINTMENT });
  const goToSuccess = () => dispatch({ type: GO_TO_SUCCESS });

  const updateDuration = (values) =>
    dispatch({ type: UPDATE_DURATION, payload: Number(values.duration) });

  const setService = useCallback(({ title, duration, price, parameter }) => {
    dispatch({ type: SET_SERVICE, payload: { title, duration, price, parameter } });
  }, []);

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

  const close = () => {
    onClickClose();
    unsetAppointment();
  };

  const actions = {
    close,
    updateDuration,
    getPickDate,
    setService,
    goToSuccess,
    backToServices,
    backToTimetable,
  };

  return [state, actions];
};

export default useUpdateAppointmentState;
