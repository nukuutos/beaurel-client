import {
  GET_APPOINTMENTS_SUCCESS,
  SET_APPOINTMENT_DATE,
  SET_APPOINTMENT_SERVICE,
  UNSET_APPOINTMENT,
  UNSET_APPOINTMENT_DATE,
  UNSET_APPOINTMENT_SERVICE,
  BOOK_APPOINTMENT_SUCCESS,
} from './types';

const INITIAL_STATE = {
  masterId: null,
  appointments: {},
  bookingAppointment: { date: null, time: null, service: null, availableAppointments: null },
  availableAppointments: null,
  unavailableAppointments: null,
};

// availableAppointments only for client

const appointmentsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENTS_SUCCESS:
      const { appointments } = payload;

      return {
        ...state,
        ...appointments,
      };

    case SET_APPOINTMENT_DATE:
      //  date, time, availableAppointments, availableAppointments in payload
      return {
        ...state,
        bookingAppointment: { ...state.bookingAppointment, ...payload },
      };

    case UNSET_APPOINTMENT_DATE:
      return {
        ...state,
        bookingAppointment: {
          ...state.bookingAppointment,
          date: null,
          time: null,
          availableAppointments: null,
          unavailableAppointments: null,
        },
      };

    case SET_APPOINTMENT_SERVICE:
      // const { id } = payload;
      return {
        ...state,
        bookingAppointment: { ...state.bookingAppointment, service: { ...payload } },
      };

    case UNSET_APPOINTMENT_SERVICE:
      // const { id } = payload;
      return {
        ...state,
        bookingAppointment: { ...state.bookingAppointment, service: null },
      };

    case UNSET_APPOINTMENT:
      return {
        ...state,
        bookingAppointment: {
          date: null,
          time: null,
          availableAppointments: null,
          unavailableAppointments: null,
          service: null,
        },
      };

    case BOOK_APPOINTMENT_SUCCESS: {
      const { time, date } = payload;

      const appointments = { ...state.appointments };

      if (appointments[date]) appointments[date].push(time);
      else appointments[date] = [time];

      return { ...state, appointments };
    }

    default:
      return state;
  }
};

export default appointmentsReducer;
