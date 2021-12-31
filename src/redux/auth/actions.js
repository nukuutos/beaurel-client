import {
  SIGN_IN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  SIGN_OUT,
  SET_AUTH_DATA,
} from './types';

export const signInSuccess = (accessTokenAndRole) => ({
  type: SIGN_IN_SUCCESS,
  payload: accessTokenAndRole,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

// TOKEN REFRESH

export const refreshTokenSuccess = (accessTokenAndRole) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: accessTokenAndRole,
});

export const refreshTokenFailure = () => ({
  type: REFRESH_TOKEN_FAILURE,
});

export const setAuthData = (data) => ({
  type: SET_AUTH_DATA,
  payload: data,
});
