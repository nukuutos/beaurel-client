import { GET_TIMETABLE_SUCCESS, SET_TIMETABLE_UPDATE, UNSET_TIMETABLE_UPDATE } from './types';

export const getTimetableSuccess = (timetable) => ({
  type: GET_TIMETABLE_SUCCESS,
  payload: timetable,
});

export const setTimetableUpdate = (update) => ({
  type: SET_TIMETABLE_UPDATE,
  payload: update,
});

export const unsetTimetableUpdate = () => ({
  type: UNSET_TIMETABLE_UPDATE,
});
