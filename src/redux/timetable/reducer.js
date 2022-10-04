import { GET_TIMETABLE_SUCCESS, SET_TIMETABLE_UPDATE, UNSET_TIMETABLE_UPDATE } from './types';

const INITIAL_STATE = {
  masterId: null,
  sessionTime: null,
  type: null,
  timezone: 'Asia/Vladivostok',

  auto: {
    possibleAppointmentsTime: [],
    weekends: [],
    workingDay: {
      startAt: null,
      endAt: null,
    },
    exceptions: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
  },
  manually: {
    appointments: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
  },

  update: {
    date: null,

    sessionTime: null,
    type: null,

    auto: {
      possibleAppointmentsTime: [],
      weekends: [],
      workingDay: {
        startAt: null,
        endAt: null,
      },
      exceptions: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    },

    manually: {
      appointments: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    },
  },
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

    case UNSET_TIMETABLE_UPDATE: {
      return {
        ...state,
        update: {
          date: null,

          sessionTime: null,
          type: null,

          auto: {
            possibleAppointmentsTime: [],
            weekends: [],
            workingDay: {
              startAt: null,
              endAt: null,
            },
            exceptions: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
          },

          manually: {
            appointments: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
          },
        },
      };
    }

    default:
      return state;
  }
};

export default timetableReducer;
