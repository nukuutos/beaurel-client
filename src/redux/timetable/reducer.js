import { GET_TIMETABLE_SUCCESS } from './types';

const INITIAL_STATE = { sessionTime: null };

const timetableReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TIMETABLE_SUCCESS:
      const { timetable } = payload;

      return {
        ...state,
        ...timetable,
      };

    default:
      return state;
  }
};

export default timetableReducer;
