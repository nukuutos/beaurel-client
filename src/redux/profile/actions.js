import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_START,
  GET_PROFILE_FAILURE,
  UPDATE_ABOUT_START,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAILURE,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILURE,
  UPDATE_AVATAR_START,
  GET_MASTERS_SUCCESS,
  GET_MASTERS_FAILURE,
  GET_MASTERS_START,
  ADD_MASTER,
  DELETE_MASTER,
} from './types';

// GET PROFILE
export const getProfileStart = (id) => ({
  type: GET_PROFILE_START,
  payload: id,
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

// UPDATE AVATAR
export const updateAvatarStart = (avatar) => ({
  type: UPDATE_AVATAR_START,
  payload: avatar,
});

export const updateAvatarSuccess = (avatar) => ({
  type: UPDATE_AVATAR_SUCCESS,
  payload: avatar,
});

export const updateAvatarFailure = (error) => ({
  type: UPDATE_AVATAR_FAILURE,
  payload: error,
});

// CHANGE PUBLIC VIEW
export const changeIsPublicView = () => ({
  type: CHANGE_IS_PUBLIC_VIEW,
});

// GET MASTERS
export const getMastersStart = () => ({
  type: GET_MASTERS_START,
});

export const getMastersSuccess = (masters) => ({
  type: GET_MASTERS_SUCCESS,
  payload: masters,
});

export const getMastersFailure = (error) => ({
  type: GET_MASTERS_FAILURE,
  payload: error,
});

// ADD MASTER
export const addMaster = (masterId) => ({
  type: ADD_MASTER,
  payload: masterId,
});

export const deleteMaster = (masterId) => ({
  type: DELETE_MASTER,
  payload: masterId,
});
