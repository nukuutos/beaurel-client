import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = { city: null, timezone: null };

const slice = createSlice({
  name: 'timezone',
  initialState,
  reducers: {
    setCityAndTimezone: (state, action) => {
      const { city, timezone } = action.payload;
      return { ...state, city, timezone };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.timezone,
    }),
  },
});

const { actions, reducer } = slice;

export const { setCityAndTimezone } = actions;

export default reducer;
