import {
  GET_PROFILE_SUCCESS,
  UPDATE_ABOUT_SUCCESS,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_PLACE_OF_WORK,
  UPDATE_PROFILE_CITY,
} from './types';

const INITIAL_STATE = {
  id: null,
  isPublicView: false,
  ratingStats: { ratingCounters: [] },
  lastName: '',
  masters: [],
  reviews: [],
  role: 'master',
  // customer
  appointmentsData: { siblingAppointment: {}, appointmentsCount: 0 },
  reviewsCount: 0,
}; // try every props get null (redirect)

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS: {
      const { profile } = payload;

      return {
        ...state,
        ...profile,
      };
    }

    case UPDATE_ABOUT_SUCCESS: {
      return {
        ...state,
        aboutText: payload,
      };
    }

    case UPDATE_AVATAR_SUCCESS: {
      const { avatar } = payload;

      return {
        ...state,
        avatar,
      };
    }

    case UPDATE_PLACE_OF_WORK: {
      return {
        ...state,
        placeOfWork: payload,
      };
    }

    case UPDATE_PROFILE_CITY: {
      return {
        ...state,
        city: payload,
      };
    }

    case CHANGE_IS_PUBLIC_VIEW: {
      return {
        ...state,
        isPublicView: !state.isPublicView,
      };
    }

    default:
      return state;
  }
};

export default profileReducer;
