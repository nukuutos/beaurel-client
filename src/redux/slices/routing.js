import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  url: null,
};

const slice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    changePageStart: (state, action) => ({
      ...state,
      isLoading: true,
      url: action.payload,
    }),

    changePageFinish: (state) => ({ ...state, isLoading: false }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.routing,
    }),
  },
});

const { actions, reducer } = slice;

export const { changePageStart, changePageFinish } = actions;

export default reducer;
