import {
  GET_APPOINTMENTS_SUCCESS,
  SET_APPOINTMENT_DATE,
  SET_APPOINTMENT_SERVICE,
  UNSET_APPOINTMENT,
  UNSET_APPOINTMENT_DATE,
  UNSET_APPOINTMENT_SERVICE,
  BOOK_APPOINTMENT_SUCCESS,
  SET_MASTER_APPOINTMENTS,
  CHANGE_APPOINTMENT_STATUS,
} from './types';
import { defineCategory } from './utils';

const INITIAL_STATE = {
  // appointments for master
  // onConfirmation => ?, confirmed => ended, (rejected, cancelled, ended/expired) = history, unsuitable

  // onConfirmation
  // confirmed

  // HISTORY
  // rejected by master
  // cancelled confirmed appointment by master or customer
  // ended confirmed appointment
  // expired appointment onConfirmation

  // unsuitable

  masterAppointments: {
    onConfirmation: [],
    confirmed: [],
    history: [],
    unsuitable: [],
  },

  // every property below for booking
  masterId: null,
  appointments: {},
  bookingAppointment: {
    date: null,
    time: null,
    service: null,
    availableAppointments: null,
    unavailableAppointments: null,
  },
  availableAppointments: null,
  unavailableAppointments: null,
};

// ???? in bookingAppointment.availableAppointments and availableAppointments. same unavailableAppointments

// availableAppointments, unavailableAppointments only for client

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

    case SET_MASTER_APPOINTMENTS: {
      const { type, appointments } = payload;

      const masterAppointments = { ...state.masterAppointments };
      masterAppointments[type] = appointments;

      return { ...state, masterAppointments };
    }

    case CHANGE_APPOINTMENT_STATUS: {
      const { nextStatus, appointment } = payload;
      const { status: currentStatus, _id: appointmentId } = appointment;

      const currentCategory = defineCategory(currentStatus);
      const nextCategory = defineCategory(nextStatus);

      const masterAppointments = { ...state.masterAppointments };

      // find index in current category
      const indexToDelete = masterAppointments[currentCategory].findIndex((appointment) => {
        return appointment._id === appointmentId;
      });

      masterAppointments[currentCategory].splice(indexToDelete, 1);

      appointment.status = nextStatus;
      // find index to insert;
      // not push, inserted it correctly (i think default sort is by createdAt time in onConfirmation, in history by apppoitment time, in confirmed by appointment time, unsuitable by appointemnt time)
      masterAppointments[nextCategory].push(appointment);
      console.log(masterAppointments);

      return { ...state, masterAppointments };
    }

    default:
      return state;
  }
};

export default appointmentsReducer;
