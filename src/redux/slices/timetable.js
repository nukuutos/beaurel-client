import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
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

const slice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    getTimetable: (state, action) => {
      const { timetable } = action.payload;

      return {
        ...state,
        ...timetable,
      };
    },

    setTimetableUpdate: (state, action) => {
      const { update } = action.payload;

      return {
        ...state,
        update,
      };
    },

    unsetTimetableUpdate: (state) => ({
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
    }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.timetable,
    }),
  },
});

const { actions, reducer } = slice;

export const { getTimetable, setTimetableUpdate, unsetTimetableUpdate } = actions;

export default reducer;
