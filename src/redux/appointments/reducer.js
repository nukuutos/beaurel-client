import { GET_APPOINTMENTS_SUCCESS, SET_APPOINTMENT_DATE, SET_APPOINTMENT_SERVICE } from './types';

const INITIAL_STATE = {
  isLoading: false,
  appointments: [],
  bookingAppointment: { date: null, time: null, service: null },
};

const appointmentsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENTS_SUCCESS:
      const { appointments } = payload;

      return {
        ...state,
        isLoading: false,
        appointments,
      };

    case SET_APPOINTMENT_DATE:
      const { date, time, availableAppointments } = payload;
      return {
        ...state,
        bookingAppointment: { ...state.bookingAppointment, date, time, availableAppointments },
      };

    case SET_APPOINTMENT_SERVICE:
      // const { id } = payload;
      return {
        ...state,
        bookingAppointment: { ...state.bookingAppointment, service: { ...payload } },
      };

    default:
      return state;
  }
};

export default appointmentsReducer;
