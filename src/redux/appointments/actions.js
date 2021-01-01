import {
  GET_APPOINTMENTS_START,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAILURE,
  SET_APPOINTMENT_DATE,
  SET_APPOINTMENT_SERVICE,
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
