import { GET_TIMETABLE_FAILURE, GET_TIMETABLE_START, GET_TIMETABLE_SUCCESS } from './types';

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
