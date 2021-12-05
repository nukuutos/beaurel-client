import dayjs from 'dayjs';
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
  UPSERT_APPOINTMENT_REVIEW,
} from './types';

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
    bookedAppointments: {},
    bookingAppointment: {
      date: null,
      time: null,
      service: null,
      availableAppointments: [],
      unavailableAppointments: [],
    },
  },
};

// ???? in bookingAppointment.availableAppointments and availableAppointments. same unavailableAppointments

// availableAppointments, unavailableAppointments only for client

const appointmentsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENTS_SUCCESS: {
      const { appointments, masterId } = payload;

      return {
        ...state,
        booking: {
          ...state.booking,
          masterId,
          bookedAppointments: appointments,
        },
      };
    }

    case SET_APPOINTMENT_DATE:
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingAppointment: { ...state.booking.bookingAppointment, ...payload },
        },
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
            availableAppointments: [],
            unavailableAppointments: [],
          },
        },
      };

    case SET_APPOINTMENT_SERVICE:
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingAppointment: { ...state.booking.bookingAppointment, service: { ...payload } },
        },
      };

    case UNSET_APPOINTMENT_SERVICE:
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
            availableAppointments: [],
            unavailableAppointments: [],
            service: null,
          },
        },
      };

    case BOOK_APPOINTMENT_SUCCESS: {
      const { time, date } = payload;

      const bookedAppointments = { ...state.booking.bookedAppointments };

      if (bookedAppointments[date]) bookedAppointments[date].push(time);
      else bookedAppointments[date] = [time];

      return { ...state, booking: { ...state.booking, bookedAppointments } };
    }

    case SET_APPOINTMENTS: {
      const { type, appointments, user } = payload;

      const appointmentsState = { ...state.appointments };
      appointmentsState[user][type] = { isLoaded: true, appointments };

      return { ...state, appointments: appointmentsState };
    }

    case CHANGE_APPOINTMENT_STATUS: {
      const { nextStatus, appointment, user } = payload;
      const { status: currentStatus, _id: appointmentId, date } = appointment;

      const appointmentsState = { ...state.appointments };

      const stringDate = dayjs(date).format('DD-MM-YYYY');

      // find index in current category
      const indexToDelete = appointmentsState[user][currentStatus].appointments[
        stringDate
      ].findIndex((appointment) => appointment._id === appointmentId);

      appointmentsState[user][currentStatus].appointments[stringDate].splice(indexToDelete, 1);

      const { isLoaded: isConfirmedLoaded } = appointmentsState.master.confirmed;
      if (user === 'customer' || nextStatus !== 'confirmed' || !isConfirmedLoaded) {
        return { ...state, appointments: appointmentsState };
      }

      // next code only for master appointments, confirming appointments and confirmed appointments is not Loaded

      appointment.status = 'confirmed';
      // find index to insert;
      // not push, inserted it correctly
      // appointmentsState.master.confirmed.appointments.push(appointment);
      if (appointmentsState.master.confirmed.appointments[stringDate]) {
        appointmentsState.master.confirmed.appointments[stringDate].push(appointment);
      } else appointmentsState.master.confirmed.appointments[stringDate] = [appointment];

      return { ...state, appointments: appointmentsState };
    }

    case UPSERT_APPOINTMENT_REVIEW: {
      const { appointmentId, review } = payload;
      const appointments = { ...state.appointments };
      const customerHistoryAppointments = appointments.customer.history;

      const indexToUpdate = customerHistoryAppointments.appointments.findIndex(
        (appointment) => appointment._id === appointmentId
      );

      const appointmentToUpdate = customerHistoryAppointments.appointments[indexToUpdate];
      const updatedAppointment = {
        ...appointmentToUpdate,
        review: { ...appointmentToUpdate.review, ...review },
      };

      customerHistoryAppointments.appointments[indexToUpdate] = updatedAppointment;
      appointments.customer.history = customerHistoryAppointments;

      return { ...state, appointments };
    }

    default:
      return state;
  }
};

export default appointmentsReducer;
