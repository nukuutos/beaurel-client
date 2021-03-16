import { GET_TIMETABLE_SUCCESS, SET_TIMETABLE_UPDATE } from './types';

const INITIAL_STATE = {
  sessionTime: null,
  type: null,
  auto: {
    possibleAppointmentsTime: [],
    weekends: [],
    workingDay: null,
    exception: null,
  },
  manually: {
    appointments: {},
  },
  update: null,
};

const timetableReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TIMETABLE_SUCCESS: {
      const { timetable } = payload;

      return {
        ...state,
        ...timetable,
      };
    }

    case SET_TIMETABLE_UPDATE: {
      const { update } = payload;

      return {
        ...state,
        update,
      };
    }

    default:
      return state;
  }
};

export default timetableReducer;
