import {
  GET_PROFILE_SUCCESS,
  UPDATE_ABOUT_SUCCESS,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_PLACE_OF_WORK,
  UPDATE_PROFILE_CITY,
  GET_REVIEWS_ON_SCROLL,
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

export const updatePlaceOfWork = (placeOfWork) => ({
  type: UPDATE_PLACE_OF_WORK,
  payload: placeOfWork,
});

export const updateProfileCity = (city) => ({
  type: UPDATE_PROFILE_CITY,
  payload: city,
});

export const getReviewsOnScroll = (reviews) => ({
  type: GET_REVIEWS_ON_SCROLL,
  payload: reviews,
});

export const changeIsPublicView = () => ({
  type: CHANGE_IS_PUBLIC_VIEW,
});
