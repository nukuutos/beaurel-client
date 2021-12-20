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
  UPDATE_UNSUITABLE_APPOINTMENT,
} from './types';

export const getAppointmentsSuccess = (appointments) => ({
  type: GET_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const setAppointmentDate = (timeData) => ({
  type: SET_APPOINTMENT_DATE,
  payload: timeData,
});

export const unsetAppointmentDate = () => ({
  type: UNSET_APPOINTMENT_DATE,
});

export const setAppointmentService = (service) => ({
  type: SET_APPOINTMENT_SERVICE,
  payload: service,
});

export const unsetAppointmentService = () => ({
  type: UNSET_APPOINTMENT_SERVICE,
});

export const unsetAppointment = () => ({
  type: UNSET_APPOINTMENT,
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
