import {
  GET_PROFILE_SUCCESS,
  UPDATE_ABOUT_SUCCESS,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
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
