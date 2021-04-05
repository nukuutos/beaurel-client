import {
  GET_APPOINTMENTS_SUCCESS,
  SET_APPOINTMENT_DATE,
  SET_APPOINTMENT_SERVICE,
  UNSET_APPOINTMENT,
  UNSET_APPOINTMENT_DATE,
  UNSET_APPOINTMENT_SERVICE,
  BOOK_APPOINTMENT_SUCCESS,
  SET_APPOINTMENTS,
  CHANGE_APPOINTMENT_STATUS,
} from './types';
import { defineCategory } from './utils';

// group state like appointments and booking ?
const INITIAL_STATE = {
  // appointments for master
  // onConfirmation
  // confirmed
  // history
  // unsuitable

  // NOT RENDERED ON THE CIENT
  // "expired" appointment onConfirmation
  // "rejected" by master
  // "cancelled" confirmed appointment by master or customer
  // appointments
  appointments: {
    master: {
      onConfirmation: { isLoaded: false, appointments: [] },
      confirmed: { isLoaded: false, appointments: [] },
      history: { isLoaded: false, appointments: [] },
      unsuitable: { isLoaded: false, appointments: [] },
    },
    customer: {
      onConfirmation: { isLoaded: false, appointments: [] },
      confirmed: { isLoaded: false, appointments: [] },
      history: { isLoaded: false, appointments: [] },
      unsuitable: { isLoaded: false, appointments: [] },
    },
  },

  // booking
  // other reducer??(booking reducer)
  // every property below for booking
  booking: {
    masterId: null,
    masterAppointments: {},
    bookingAppointment: {
      date: null,
      time: null,
      service: null,
      availableAppointments: null,
      unavailableAppointments: null,
    },
  },
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
        booking: {
          ...state.booking,
          masterAppointments: appointments,
        },
      };

    case SET_APPOINTMENT_DATE:
      //  date, time, availableAppointments, availableAppointments in payload
      return {
        ...state,
        booking: { ...state.booking, bookingAppointment: { ...state.booking.bookingAppointment, ...payload } },
      };

    case UNSET_APPOINTMENT_DATE:
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingAppointment: {
            ...state.booking.bookingAppointment,
            date: null,
            time: null,
            availableAppointments: null,
            unavailableAppointments: null,
          },
        },
      };

    case SET_APPOINTMENT_SERVICE:
      // const { id } = payload;
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingAppointment: { ...state.booking.bookingAppointment, service: { ...payload } },
        },
      };

    case UNSET_APPOINTMENT_SERVICE:
      // const { id } = payload;
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingAppointment: { ...state.booking.bookingAppointment, service: null },
        },
      };

    case UNSET_APPOINTMENT:
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingAppointment: {
            date: null,
            time: null,
            availableAppointments: null,
            unavailableAppointments: null,
            service: null,
          },
        },
      };

    case BOOK_APPOINTMENT_SUCCESS: {
      const { time, date } = payload;

      const masterAppointments = { ...state.booking.masterAppointments };

      if (masterAppointments[date]) masterAppointments[date].push(time);
      else masterAppointments[date] = [time];

      return { ...state, booking: { ...state.booking, masterAppointments } };
    }

    case SET_APPOINTMENTS: {
      const { type, appointments, user } = payload;

      const appointmentsState = { ...state.appointments };
      appointmentsState[user][type] = { isLoaded: true, appointments };

      return { ...state, appointments: appointmentsState };
    }

    case CHANGE_APPOINTMENT_STATUS: {
      const { nextStatus, appointment, user } = payload;
      const { status: currentStatus, _id: appointmentId } = appointment;

      const appointmentsState = { ...state.appointments };

      // find index in current category
      const indexToDelete = appointmentsState[user][currentStatus].appointments.findIndex((appointment) => {
        return appointment._id === appointmentId;
      });

      appointmentsState[user][currentStatus].appointments.splice(indexToDelete, 1);

      const { isConfirmedLoaded } = appointmentsState['master']['confirmed'];
      if (user === 'customer' || nextStatus !== 'confirmed' || !isConfirmedLoaded) {
        return { ...state, appointments: appointmentsState };
      }

      // next code only for master appointments, confirming appointments and confirmed appointments is not Loaded

      appointment.status = 'confirmed';
      // find index to insert;
      // not push, inserted it correctly (i think default sort is by createdAt time in onConfirmation, in history by apppoitment time, in confirmed by appointment time, unsuitable by appointemnt time)
      appointmentsState['master']['confirmed'].appointments.push(appointment);

      return { ...state, appointments: appointmentsState };
    }

    default:
      return state;
  }
};

export default appointmentsReducer;
