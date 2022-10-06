import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
import { HYDRATE } from 'next-redux-wrapper';

// group state like appointments and booking ?
const initialState = {
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

  booking: {
    masterId: null,
    bookedAppointments: {},
  },
};

// ???? in bookingAppointment.availableAppointments and availableAppointments. same unavailableAppointments

// availableAppointments, unavailableAppointments only for client

const slice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    getAppointments: (state, action) => {
      const { appointments, masterId } = action.payload;

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
    },

    bookAppointment: (state, action) => {
      const { time, date } = action.payload;

      const bookedAppointments = { ...state.booking.bookedAppointments };

      if (bookedAppointments[date]) bookedAppointments[date].push(time);
      else bookedAppointments[date] = [time];

      return { ...state, booking: { ...state.booking, bookedAppointments } };
    },

    setAppointments: (state, action) => {
      const { type, appointments, user } = action.payload;

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
    },

    getAppointmentsOnScroll: (state, action) => {
      const { appointments, user, category } = action.payload;

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
    },

    setAppointmentsNotifications: (state, action) => {
      const { notifications } = action.payload;

      const isNotification = { ...initialState.isNotification };
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
    },

    bookAppointmentByCustomer: (state, action) => {
      const { appointment } = action.payload;
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
    },

    changeAppointmentStatus: (state, action) => {
      const { nextStatus, appointment, user } = action.payload;
      const { status: statusData, _id: appointmentId, date } = appointment;
      const { status: currentStatus } = statusData;

      const appointmentsState = { ...state.appointments };
      const stringDate = dayjs(date).utc().format('DD-MM-YYYY');

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
    },
    // change appointment status and change appointment socket join?
    changeAppointmentStatusSocket: (state, action) => {
      const { nextStatus, appointment, user } = action.payload;
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

      const stringDate = dayjs(date).utc().format('DD-MM-YYYY');

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
    },
    // change appointment status and change appointment socket join?
    updateAppointmentToUnsuitableSocket: (state, action) => {
      const { appointment } = action.payload;
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

      const stringDate = dayjs(date).utc().format('DD-MM-YYYY');

      if (appointmentsState.customer.unsuitable.appointments[stringDate]) {
        appointmentsState.customer.unsuitable.appointments[stringDate].push(appointment);
      } else appointmentsState.customer.unsuitable.appointments[stringDate] = [appointment];

      return { ...state, isNotification, appointments: appointmentsState };
    },

    updateUnsuitableAppointment: (state, action) => {
      const { appointmentId, prevDate, duration, date, time } = action.payload;

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
        // date: dayjs(date, 'DD-MM-YYYY'),
        date,
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
    },

    upsertAppointmentReview: (state, action) => {
      const { appointmentId, review, stringDate } = action.payload;
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
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.appointments,
    }),
  },
});

const { actions, reducer } = slice;

export const {
  getAppointments,
  bookAppointment,
  setAppointments,
  getAppointmentsOnScroll,
  setAppointmentsNotifications,
  bookAppointmentByCustomer,
  changeAppointmentStatus,
  changeAppointmentStatusSocket,
  updateAppointmentToUnsuitableSocket,
  updateUnsuitableAppointment,
  upsertAppointmentReview,
} = actions;

export default reducer;
