import {
  GET_APPOINTMENTS_SUCCESS,
  BOOK_APPOINTMENT_SUCCESS,
  SET_APPOINTMENTS,
  CHANGE_APPOINTMENT_STATUS,
  UPSERT_APPOINTMENT_REVIEW,
  UPDATE_UNSUITABLE_APPOINTMENT,
  SET_APPOINTMENTS_NOTIFICATIONS,
  GET_APPOINTMENTS_ON_SCROLL,
} from './types';

export const getAppointmentsSuccess = (appointments) => ({
  type: GET_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const bookAppointmentSuccess = (bookingData) => ({
  type: BOOK_APPOINTMENT_SUCCESS,
  payload: bookingData,
});

export const setAppointments = (appointmentsData) => ({
  type: SET_APPOINTMENTS,
  payload: appointmentsData,
});

export const changeAppointmentStatus = (appointmentData) => ({
  type: CHANGE_APPOINTMENT_STATUS,
  payload: appointmentData,
});

export const upsertAppointmentReview = (appointmentData) => ({
  type: UPSERT_APPOINTMENT_REVIEW,
  payload: appointmentData,
});

export const updateUnsuitableAppointment = (appointmentData) => ({
  type: UPDATE_UNSUITABLE_APPOINTMENT,
  payload: appointmentData,
});

export const setAppointmentsNotifications = (notifications) => ({
  type: SET_APPOINTMENTS_NOTIFICATIONS,
  payload: notifications,
});

export const getAppointmentsOnScroll = (appointments) => ({
  type: GET_APPOINTMENTS_ON_SCROLL,
  payload: appointments,
});
