import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const slice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: {
      reducer: (state, action) => [...state, action.payload],
      prepare: (data) => ({ payload: { ...data, id: uuidv4() } }),
    },
    deleteAlert: (state) => state.slice(0, -1),
  },
});

const { actions, reducer } = slice;

export const { addAlert, deleteAlert } = actions;

export default reducer;
