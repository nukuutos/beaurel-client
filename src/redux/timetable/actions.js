import {
  GET_TIMETABLE_FAILURE,
  // GET_TIMETABLE_START,
  GET_TIMETABLE_SUCCESS,
  SET_TIMETABLE_UPDATE,
  UNSET_TIMETABLE_UPDATE,
} from './types';

// export const getTimetableStart = () => ({
//   type: GET_TIMETABLE_START,
// });

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

// export const getTimetableFailure = () => ({
//   type: GET_TIMETABLE_FAILURE,
// });

// export const getTimetableAndAppointmentsStart = () => ({
//   type: GET_TIMETABLE_AND_APPOINTMENTS_START,
// });

// export const getTimetableAndAppointmentsSuccess = () => ({
//   type: GET_TIMETABLE_AND_APPOINTMENTS_SUCCESS,
// });

// export const getTimetableAndAppointmentsFailure = () => ({
//   type: GET_TIMETABLE_AND_APPOINTMENTS_FAILURE,
// });
