import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
import {
  GET_APPOINTMENTS_ON_SCROLL,
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
  UPDATE_UNSUITABLE_APPOINTMENT,
  BOOK_APPOINTMENT_BY_CUSTOMER,
  SET_APPOINTMENTS_NOTIFICATIONS,
  CHANGE_APPOINTMENT_STATUS_SOCKET,
  UPDATE_APPOINTMENT_TO_UNSUITABLE_SOCKET,
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

  isNotification: {
    master: { onConfirmation: false, confirmed: false, unsuitable: false },
    customer: { onConfirmation: false, confirmed: false, unsuitable: false },
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

      let appointmentsToState;
      if (masterId === state.booking.masterId) {
        appointmentsToState = { ...state.booking.bookedAppointments, ...appointments };
      } else {
        appointmentsToState = appointments;
      }

      return {
        ...state,
        booking: {
          ...state.booking,
          masterId,
          bookedAppointments: appointmentsToState,
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
      const userAppointments = { ...appointmentsState[user] };
      const userAppointmentsCategory = { ...userAppointments[type], isLoaded: true, appointments };

      userAppointments[type] = userAppointmentsCategory;
      appointmentsState[user] = userAppointments;

      // userAppointmentsCategory = { isLoaded: true, appointments };

      // notification
      const isNotification = { ...state.isNotification };
      const isNotificationUser = { ...isNotification[user] };
      isNotificationUser[type] = false;
      isNotification[user] = isNotificationUser;

      return { ...state, isNotification, appointments: appointmentsState };
    }

    case GET_APPOINTMENTS_ON_SCROLL: {
      const { appointments, user, category } = payload;

      const appointmentsState = { ...state.appointments };
      const userAppointments = { ...appointmentsState[user] };
      const userAppointmentsCategory = { ...userAppointments[category] };
      const userAppointmentsCategoryAppointments = {
        ...userAppointmentsCategory.appointments,
      };

      for (const date in appointments) {
        if (userAppointmentsCategoryAppointments[date]) {
          userAppointmentsCategoryAppointments[date] = [
            ...userAppointmentsCategoryAppointments[date],
            ...appointments[date],
          ];
        } else {
          userAppointmentsCategoryAppointments[date] = [...appointments[date]];
        }
      }

      userAppointmentsCategory.appointments = userAppointmentsCategoryAppointments;
      userAppointments[category] = userAppointmentsCategory;
      appointmentsState[user] = userAppointments;
      // get appointment on scroll

      // if(date) push to date
      // if no date create date
      return { ...state, appointments: appointmentsState };
    }

    case SET_APPOINTMENTS_NOTIFICATIONS: {
      const { notifications } = payload;

      const isNotification = { ...INITIAL_STATE.isNotification };
      const isNotificationMaster = { ...isNotification.master };
      const isNotificationCustomer = { ...isNotification.customer };

      for (const status in isNotificationMaster) {
        if (notifications.master?.includes(status)) {
          isNotificationMaster[status] = true;
        }
      }

      for (const status in isNotificationCustomer) {
        if (notifications.customer?.includes(status)) {
          isNotificationCustomer[status] = true;
        }
      }

      const newIsNotification = { master: isNotificationMaster, customer: isNotificationCustomer };

      return { ...state, isNotification: newIsNotification };
    }

    case BOOK_APPOINTMENT_BY_CUSTOMER: {
      const { appointment } = payload;
      const date = dayjs(appointment.date).format('DD-MM-YYYY');
      const appointmentsState = { ...state.appointments };
      const masterAppointments = { ...appointmentsState.master };
      const masterAppointmentsOnConfirmation = { ...masterAppointments.onConfirmation };
      const masterAppointmentsOnConfirmationAppointments = {
        ...masterAppointmentsOnConfirmation.appointments,
      };
      // sort
      let appointments;
      if (masterAppointmentsOnConfirmationAppointments[date]) {
        appointments = [...masterAppointmentsOnConfirmationAppointments[date], appointment];
      } else appointments = [appointment];

      masterAppointmentsOnConfirmationAppointments[date] = appointments;
      masterAppointmentsOnConfirmation.appointments = masterAppointmentsOnConfirmationAppointments;
      masterAppointments.onConfirmation = masterAppointmentsOnConfirmation;
      appointmentsState.master = masterAppointments;
      // notification
      const isNotification = { ...state.isNotification };
      const isNotificationMaster = { ...isNotification.master, onConfirmation: true };
      isNotification.master = isNotificationMaster;

      return { ...state, isNotification, appointments: appointmentsState };
    }

    case CHANGE_APPOINTMENT_STATUS: {
      const { nextStatus, appointment, user } = payload;
      const { status: statusData, _id: appointmentId, date } = appointment;
      const { status: currentStatus } = statusData;

      const appointmentsState = { ...state.appointments };
      const stringDate = dayjs(date).format('DD-MM-YYYY');

      // find index in current category
      const indexToDelete = appointmentsState[user][currentStatus].appointments[
        stringDate
      ].findIndex((appointment) => appointment._id === appointmentId);

      appointmentsState[user][currentStatus].appointments[stringDate].splice(indexToDelete, 1);
      if (!appointmentsState[user][currentStatus].appointments[stringDate].length) {
        delete appointmentsState[user][currentStatus].appointments[stringDate];
      }

      const { isLoaded: isConfirmedLoaded } = appointmentsState.master.confirmed;

      // get notification
      let isNotificationInCategory;
      for (const date in appointmentsState[user][currentStatus].appointments) {
        isNotificationInCategory = appointmentsState[user][currentStatus].appointments[date].some(
          (appointment) => !appointment.isViewed[user]
        );
        if (isNotificationInCategory) break;
      }

      const isNotification = { ...state.isNotification };
      const isNotificationUser = { ...state.isNotification[user] };
      isNotificationUser[currentStatus] = isNotificationInCategory;
      isNotification[user] = isNotificationUser;

      if (user === 'customer' || nextStatus !== 'confirmed' || !isConfirmedLoaded) {
        return { ...state, isNotification, appointments: appointmentsState };
      }

      // next code only for master appointments, confirming appointments and confirmed appointments is not Loaded

      appointment.status = 'confirmed';
      // find index to insert;
      // not push, inserted it correctly
      // appointmentsState.master.confirmed.appointments.push(appointment);
      if (appointmentsState.master.confirmed.appointments[stringDate]) {
        appointmentsState.master.confirmed.appointments[stringDate].push(appointment);
      } else appointmentsState.master.confirmed.appointments[stringDate] = [appointment];

      return { ...state, isNotification, appointments: appointmentsState };
    }
    // change appointment status and change appointment socket join?
    case CHANGE_APPOINTMENT_STATUS_SOCKET: {
      const { nextStatus, appointment, user } = payload;
      const { status: statusData, _id: appointmentId, date } = appointment;
      const { status: currentStatus } = statusData;

      const appointmentsState = { ...state.appointments };

      const isNotification = { ...state.isNotification };
      isNotification[user][nextStatus] = true;

      // for socket connection
      if (
        !appointmentsState[user][nextStatus].isLoaded &&
        !appointmentsState[user][currentStatus].isLoaded
      ) {
        return { ...state, isNotification };
      }

      const stringDate = dayjs(date).format('DD-MM-YYYY');

      if (appointmentsState[user][currentStatus].isLoaded) {
        // find index in current category
        const indexToDelete = appointmentsState[user][currentStatus].appointments[
          stringDate
        ].findIndex((appointment) => appointment._id === appointmentId);

        appointmentsState[user][currentStatus].appointments[stringDate].splice(indexToDelete, 1);
        if (!appointmentsState[user][currentStatus].appointments[stringDate].length) {
          delete appointmentsState[user][currentStatus].appointments[stringDate];
        }

        const { isLoaded: isConfirmedLoaded } = appointmentsState.master.confirmed;
        if (user === 'customer' || nextStatus !== 'confirmed' || !isConfirmedLoaded) {
          return { ...state, isNotification, appointments: appointmentsState };
        }
      }
      // next code only for master appointments, confirming appointments and confirmed appointments is Loaded

      appointment.status = 'confirmed';
      // find index to insert;
      // not push, inserted it correctly
      // appointmentsState.master.confirmed.appointments.push(appointment);
      if (appointmentsState.master.confirmed.appointments[stringDate]) {
        appointmentsState.master.confirmed.appointments[stringDate].push(appointment);
      } else appointmentsState.master.confirmed.appointments[stringDate] = [appointment];

      return { ...state, isNotification, appointments: appointmentsState };
    }
    // change appointment status and change appointment socket join?
    case UPDATE_APPOINTMENT_TO_UNSUITABLE_SOCKET: {
      const { appointment } = payload;
      const { _id: appointmentId, date } = appointment;

      const appointmentsState = { ...state.appointments };

      const isNotification = { ...state.isNotification };
      isNotification.customer.unsuitable = true;

      const customerAppointments = { ...appointmentsState.customer };

      const categories = Object.keys(customerAppointments).filter((category) => {
        const appointments = Object.keys(customerAppointments[category].appointments);
        return !!appointments.length;
      });

      for (const category of categories) {
        const categoryAppointments = { ...customerAppointments[category].appointments };
        const dates = Object.keys(categoryAppointments);

        let isUnsuitableAppointment;
        for (const date of dates) {
          const dateAppointments = [...categoryAppointments[date]];
          // eslint-disable-next-line no-loop-func
          const filteredAppointments = dateAppointments.filter((appointment) => {
            const isFound = appointment._id === appointmentId;
            if (isFound) isUnsuitableAppointment = true;
            return !isFound;
          });

          if (isUnsuitableAppointment && filteredAppointments.length) {
            categoryAppointments[date] = filteredAppointments;
            customerAppointments[category].appointments = categoryAppointments;
            break;
          } else if (isUnsuitableAppointment) {
            delete categoryAppointments[date];
            customerAppointments[category].appointments = categoryAppointments;
          }
        }

        if (isUnsuitableAppointment) break;
      }

      appointmentsState.customer = customerAppointments;

      const { isLoaded: isUnsuitableLoaded } = appointmentsState.customer.unsuitable;

      if (!isUnsuitableLoaded) {
        return { ...state, isNotification, appointments: appointmentsState };
      }

      const stringDate = dayjs(date).format('DD-MM-YYYY');

      if (appointmentsState.customer.unsuitable.appointments[stringDate]) {
        appointmentsState.customer.unsuitable.appointments[stringDate].push(appointment);
      } else appointmentsState.customer.unsuitable.appointments[stringDate] = [appointment];

      return { ...state, isNotification, appointments: appointmentsState };
    }

    case UPDATE_UNSUITABLE_APPOINTMENT: {
      const { appointmentId, prevDate, duration, date, time } = payload;

      const appointmentsState = { ...state.appointments };

      const prevStringDate = dayjs(prevDate).utc().format('DD-MM-YYYY');

      // find index in current category
      const index = appointmentsState.master.unsuitable.appointments[prevStringDate].findIndex(
        (appointment) => appointment._id === appointmentId
      );

      const appointment = cloneDeep(
        appointmentsState.master.unsuitable.appointments[prevStringDate][index]
      );

      appointmentsState.master.unsuitable.appointments[prevStringDate].splice(index, 1);
      if (!appointmentsState.master.unsuitable.appointments[prevStringDate].length) {
        delete appointmentsState.master.unsuitable.appointments[prevStringDate];
      }

      const { isLoaded: isConfirmedLoaded } = appointmentsState.master.confirmed;

      if (!isConfirmedLoaded) {
        return { ...state, appointments: appointmentsState };
      }

      const confirmedAppointment = {
        ...appointment,
        date: dayjs(date, 'DD-MM-YYYY'),
        time,
        status: 'confirmed',
        service: { ...appointment.service, duration },
      };

      // next code only for master appointments, confirming appointments and confirmed appointments is not Loaded

      appointment.status = 'confirmed';
      // find index to insert;
      // not push, inserted it correctly
      // appointmentsState.master.confirmed.appointments.push(appointment);
      if (appointmentsState.master.confirmed.appointments[date]) {
        appointmentsState.master.confirmed.appointments[date].push(confirmedAppointment);
      } else appointmentsState.master.confirmed.appointments[date] = [confirmedAppointment];

      return { ...state, appointments: appointmentsState };
    }

    case UPSERT_APPOINTMENT_REVIEW: {
      const { appointmentId, review, stringDate } = payload;
      const appointments = { ...state.appointments };
      const customerHistoryAppointments = appointments.customer.history.appointments[stringDate];

      const indexToUpdate = customerHistoryAppointments.findIndex(
        (appointment) => appointment._id === appointmentId
      );

      const appointmentToUpdate = customerHistoryAppointments[indexToUpdate];

      const updatedAppointment = {
        ...appointmentToUpdate,
        review: { ...appointmentToUpdate.review, ...review },
      };

      customerHistoryAppointments[indexToUpdate] = updatedAppointment;

      return { ...state, appointments };
    }

    default:
      return state;
  }
};

export default appointmentsReducer;
