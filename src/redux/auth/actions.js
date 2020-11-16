import {
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_FAILURE,
  SIGN_OUT,
} from './types';

export const signInStart = (emailAndPassword) => ({
  type: SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (accessTokenAndRole) => ({
  type: SIGN_IN_SUCCESS,
  payload: accessTokenAndRole,
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

// TOKEN REFRESH

export const refreshTokenStart = () => ({
  type: REFRESH_TOKEN_START,
});

export const refreshTokenSuccess = (accessTokenAndRole) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: accessTokenAndRole,
});

export const refreshTokenFailure = (error) => ({
  type: REFRESH_TOKEN_FAILURE,
  payload: error,
});
