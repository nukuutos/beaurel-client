import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_START,
  GET_PROFILE_FAILURE,
  UPDATE_ABOUT_START,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAILURE,
} from './types';

// GET PROFILE
export const getProfileStart = () => ({
  type: GET_PROFILE_START,
});

export const getProfileSuccess = (profile) => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileFailure = (error) => ({
  type: GET_PROFILE_FAILURE,
  payload: error,
});

// UPDATE ABOUT
export const updateAboutStart = (aboutText) => ({
  type: UPDATE_ABOUT_START,
  payload: aboutText,
});

export const updateAboutSuccess = (aboutText) => ({
  type: UPDATE_ABOUT_SUCCESS,
  payload: aboutText,
});

export const updateAboutFailure = (error) => ({
  type: UPDATE_ABOUT_FAILURE,
  payload: error,
});
