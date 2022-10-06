import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  close: null,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalCloseFunction: (state, action) => ({
      ...state,
      close: action.payload,
    }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.modal,
    }),
  },
});

const { actions, reducer } = slice;

export const { setModalCloseFunction } = actions;

export default reducer;
