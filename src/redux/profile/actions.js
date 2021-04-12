import {
  GET_PROFILE_SUCCESS,
  UPDATE_ABOUT_SUCCESS,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
  GET_MASTERS_SUCCESS,
  ADD_MASTER,
  DELETE_MASTER,
} from './types';

export const getProfileSuccess = (profile) => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile,
});

export const updateAboutSuccess = (aboutText) => ({
  type: UPDATE_ABOUT_SUCCESS,
  payload: aboutText,
});

export const updateAvatarSuccess = (avatar) => ({
  type: UPDATE_AVATAR_SUCCESS,
  payload: avatar,
});

export const changeIsPublicView = () => ({
  type: CHANGE_IS_PUBLIC_VIEW,
});

export const getMastersSuccess = (masters) => ({
  type: GET_MASTERS_SUCCESS,
  payload: masters,
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
