import {
  GET_TIMETABLE_FAILURE,
  GET_TIMETABLE_START,
  GET_TIMETABLE_SUCCESS,
  GET_TIMETABLE_AND_APPOINTMENTS_START,
  GET_TIMETABLE_AND_APPOINTMENTS_SUCCESS,
  GET_TIMETABLE_AND_APPOINTMENTS_FAILURE,
} from './types';

export const getTimetableStart = () => ({
  type: GET_TIMETABLE_START,
});

export const getTimetableSuccess = (timetable) => ({
  type: GET_TIMETABLE_SUCCESS,
  payload: timetable,
});

export const getTimetableFailure = () => ({
  type: GET_TIMETABLE_FAILURE,
});

export const getTimetableAndAppointmentsStart = () => ({
  type: GET_TIMETABLE_AND_APPOINTMENTS_START,
});

export const getTimetableAndAppointmentsSuccess = () => ({
  type: GET_TIMETABLE_AND_APPOINTMENTS_SUCCESS,
});

export const getTimetableAndAppointmentsFailure = () => ({
  type: GET_TIMETABLE_AND_APPOINTMENTS_FAILURE,
});
