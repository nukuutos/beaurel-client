import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  accessToken: null,
  role: null,
  id: null,

  username: null,
  firstName: null,
  lastName: null,
  phone: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    refreshTokenSuccess: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    signOut: (state) => ({ ...state, accessToken: null, role: null, id: null }),

    refreshTokenFailure: (state) => ({ ...state, accessToken: null, role: null, id: null }),

    setAuthData: (state, action) => ({ ...state, ...action.payload }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
  },
});

const { actions, reducer } = slice;

export const { signIn, refreshTokenSuccess, refreshTokenFailure, setAuthData, signOut } = actions;

export default reducer;
