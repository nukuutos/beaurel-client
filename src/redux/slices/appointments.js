import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
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

const categories = ['onConfirmation', 'confirmed', 'unsuitable', 'history'];

// ???? in bookingAppointment.availableAppointments and availableAppointments. same unavailableAppointments

// availableAppointments, unavailableAppointments only for client

const slice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    getAppointments: (state, action) => {
      const { appointments, masterId } = action.payload;

      const { booking } = state;

      if (masterId === booking.masterId) {
        booking.bookedAppointments = { ...booking.bookedAppointments, ...appointments };
      } else {
        booking.bookedAppointments = appointments;
      }
    },

    bookAppointment: (state, action) => {
      const { time, date } = action.payload;

      const { bookedAppointments } = state.booking;

      if (bookedAppointments[date]) {
        bookedAppointments[date].push(time);
      } else {
        bookedAppointments[date] = [time];
      }
    },

    setAppointments: (state, action) => {
      const { type, appointments, user } = action.payload;

      const userAppointments = state.appointments[user];
      userAppointments[type] = { isLoaded: true, appointments };

      state.isNotification[user][type] = false;
    },

    getAppointmentsOnScroll: (state, action) => {
      const { appointments, user, category } = action.payload;

      const { appointments: categoryAppointments } = state.appointments[user][category];

      for (const date in appointments) {
        if (categoryAppointments[date]) {
          categoryAppointments[date] = [...categoryAppointments[date], ...appointments[date]];
        } else {
          categoryAppointments[date] = [...appointments[date]];
        }
      }
    },

    setAppointmentsNotifications: (state, action) => {
      const { notifications } = action.payload;

      const { master, customer } = state.isNotification;

      for (const status in master) {
        if (notifications.master?.includes(status)) {
          master[status] = true;
        }
      }

      for (const status in customer) {
        if (notifications.customer?.includes(status)) {
          customer[status] = true;
        }
      }
    },

    bookAppointmentByCustomer: (state, action) => {
      const { appointment } = action.payload;
      const date = dayjs(appointment.date).format('DD-MM-YYYY');

      const { appointments } = state.appointments.master.onConfirmation;

      // sort
      if (appointments[date]) {
        appointments[date] = [...appointments[date], appointment];
      } else {
        appointments[date] = [appointment];
      }

      state.isNotification.master.onConfirmation = true;
    },

    changeAppointmentStatus: (state, action) => {
      const { nextStatus, appointment, user } = action.payload;
      const { status: statusData, _id: appointmentId, date } = appointment;
      const { status: currentStatus } = statusData;

      const stringDate = dayjs(date).utc().format('DD-MM-YYYY');
      const oldAppointmentsCategory = state.appointments[user][currentStatus].appointments;
      const oldAppointments = oldAppointmentsCategory[stringDate];

      // find index in current category
      const indexToDelete = oldAppointments.findIndex(
        (appointment) => appointment._id === appointmentId
      );

      oldAppointments.splice(indexToDelete, 1);

      if (!oldAppointments.length) {
        delete oldAppointmentsCategory[stringDate];
      }

      // get notification
      let isNotificationInCategory;
      for (const stringDate in oldAppointmentsCategory) {
        isNotificationInCategory = oldAppointmentsCategory[stringDate].some(
          (appointment) => !appointment.isViewed[user]
        );

        if (isNotificationInCategory) break;
      }

      state.isNotification[user][currentStatus] = isNotificationInCategory;

      const { isLoaded: isConfirmedLoaded } = state.appointments.master.confirmed;

      if (user === 'customer' || nextStatus !== 'confirmed' || !isConfirmedLoaded) {
        return;
      }

      // next code only for master appointments, confirming appointments and confirmed appointments is not Loaded
      appointment.status = 'confirmed';

      const confirmedMasterAppointmentsState =
        state.appointments.master.confirmed.appointments[stringDate];

      const confirmedMasterAppointments = confirmedMasterAppointmentsState[stringDate];
      // find index to insert;
      // not push, inserted it correctly
      if (confirmedMasterAppointments) {
        confirmedMasterAppointments.push(appointment);
      } else {
        confirmedMasterAppointmentsState[stringDate] = [appointment];
      }
    },
    // change appointment status and change appointment socket join?
    changeAppointmentStatusSocket: (state, action) => {
      const { nextStatus, appointment, user } = action.payload;
      const { status: statusData, _id: appointmentId, date } = appointment;
      const { status: currentStatus } = statusData;

      // const appointmentsState = { ...state.appointments };
      const { isLoaded: isNextCategoryLoaded } = state.appointments[user][nextStatus];
      const { isLoaded: isCurrentCategoryLoaded } = state.appointments[user][currentStatus];

      console.log('wtfuck');

      state.isNotification[user][nextStatus] = true;

      // for socket connection
      if (!isNextCategoryLoaded && !isCurrentCategoryLoaded) {
        return;
      }

      const stringDate = dayjs(date).utc().format('DD-MM-YYYY');

      const { appointments } = state.appointments[user][currentStatus];
      const appointmentsDate = appointments[stringDate];

      if (isCurrentCategoryLoaded) {
        // find index in current category
        const indexToDelete = appointmentsDate.findIndex(
          (appointment) => appointment._id === appointmentId
        );

        appointmentsDate.splice(indexToDelete, 1);

        if (!appointmentsDate.length) {
          delete appointments[stringDate];
        }

        const { isLoaded: isConfirmedLoaded } = state.appointments.master.confirmed;

        if (user === 'customer' || nextStatus !== 'confirmed' || !isConfirmedLoaded) {
          return;
        }
      }
      // next code only for master appointments, confirming appointments and confirmed appointments is Loaded

      const confirmedAppointments = state.appointments.master.confirmed.appointments;
      const confirmedAppointmentsDate = confirmedAppointments[stringDate];

      appointment.status = 'confirmed';
      // find index to insert;
      // not push, inserted it correctly
      if (confirmedAppointmentsDate) {
        confirmedAppointmentsDate.push(appointment);
      } else {
        confirmedAppointments[stringDate] = [appointment];
      }
    },
    // change appointment status and change appointment socket join?
    updateAppointmentToUnsuitableSocket: (state, action) => {
      const { appointment } = action.payload;
      const { _id: appointmentId, date } = appointment;

      state.isNotification.customer.unsuitable = true;

      const customerAppointments = state.appointments.customer;

      const loadedCategories = categories.filter(
        (category) => customerAppointments[category].isLoaded
      );

      // remove stale appointment
      for (const category of loadedCategories) {
        const categoryAppointments = customerAppointments[category].appointments;
        const dates = Object.keys(categoryAppointments);

        let isUnsuitableAppointment;
        for (const date of dates) {
          const dateAppointments = categoryAppointments[date];

          isUnsuitableAppointment = dateAppointments.some(
            (appointment) => appointment._id === appointmentId
          );

          const filteredAppointments = dateAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          );

          if (filteredAppointments.length) {
            categoryAppointments[date] = filteredAppointments;
          } else {
            delete categoryAppointments[date];
          }

          if (isUnsuitableAppointment) break;
        }

        if (isUnsuitableAppointment) break;
      }

      // appointmentsState.customer = customerAppointments;
      // push appointment to unsuitable
      const { appointments, isLoaded } = customerAppointments.unsuitable;

      if (!isLoaded) return;

      const stringDate = dayjs(date).utc().format('DD-MM-YYYY');

      if (appointments[stringDate]) {
        appointments[stringDate].push(appointment);
      } else {
        appointments[stringDate] = [appointment];
      }
    },

    updateUnsuitableAppointment: (state, action) => {
      const { appointmentId, prevDate, duration, date, time } = action.payload;

      const appointmentsState = { ...state.appointments };

      const prevStringDate = dayjs(prevDate).utc().format('DD-MM-YYYY');

      const { appointments } = appointmentsState.master.unsuitable;
      const appointmentsDate = appointments[prevStringDate];

      // find index in current category
      const index = appointmentsDate.findIndex((appointment) => appointment._id === appointmentId);

      const [appointment] = appointmentsDate.splice(index, 1);

      if (!appointmentsDate.length) {
        delete appointments[prevStringDate];
      }

      const { isLoaded: isConfirmedLoaded } = appointmentsState.master.confirmed;

      if (!isConfirmedLoaded) return;

      const confirmedAppointment = {
        ...appointment,
        date,
        time,
        status: 'confirmed',
        service: { ...appointment.service, duration },
      };

      const confirmedDateAppointments = appointmentsState.master.confirmed.appointments;
      const confirmedDateAppointmentsDate = confirmedDateAppointments[date];

      // not push, inserted it correctly
      if (confirmedDateAppointmentsDate) {
        confirmedDateAppointmentsDate.push(confirmedAppointment);
      } else {
        confirmedDateAppointments[date] = [confirmedAppointment];
      }
    },

    upsertAppointmentReview: (state, action) => {
      const { appointmentId, review, stringDate } = action.payload;

      const historyAppointments = state.appointments.customer.history.appointments[stringDate];

      const indexToUpdate = historyAppointments.findIndex(
        (appointment) => appointment._id === appointmentId
      );

      const historyAppointment = historyAppointments[indexToUpdate];

      historyAppointment.review = { ...historyAppointment.review, ...review };
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
