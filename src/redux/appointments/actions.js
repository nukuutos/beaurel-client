import {
  GET_APPOINTMENTS_START,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAILURE,
  SET_APPOINTMENT_DATE,
  SET_APPOINTMENT_SERVICE,
  UNSET_APPOINTMENT,
  UNSET_APPOINTMENT_DATE,
  UNSET_APPOINTMENT_SERVICE,
  BOOK_APPOINTMENT_SUCCESS,
  SET_APPOINTMENTS,
  CHANGE_APPOINTMENT_STATUS,
} from './types';

export const getAppointmentsStart = () => ({
  type: GET_APPOINTMENTS_START,
});

export const getAppointmentsSuccess = (appointments) => ({
  type: GET_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const getAppointmentsFailure = () => ({
  type: GET_APPOINTMENTS_FAILURE,
});

export const setAppointmentDate = (timeData) => ({
  type: SET_APPOINTMENT_DATE,
  payload: timeData,
});

export const setAppointmentService = (service) => ({
  type: SET_APPOINTMENT_SERVICE,
  payload: service,
});

export const unsetAppointment = () => ({
  type: UNSET_APPOINTMENT,
});

export const unsetAppointmentDate = () => ({
  type: UNSET_APPOINTMENT_DATE,
});

export const unsetAppointmentService = () => ({
  type: UNSET_APPOINTMENT_SERVICE,
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
