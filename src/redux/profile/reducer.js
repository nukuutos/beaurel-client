import { GET_PROFILE_SUCCESS, UPDATE_ABOUT_SUCCESS, UPDATE_ABOUT_START, CHANGE_IS_PUBLIC_VIEW } from './types';

const INITIAL_STATE = { isLoadingAbout: false, isPublicView: false, ratingStats: {}, lastName: '' }; // try every props get null (redirect)

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS:
      const { profile } = payload;

      return {
        ...state,
        ...profile,
      };

    case UPDATE_ABOUT_START:
      return {
        ...state,
        isLoadingAbout: true,
      };

    case UPDATE_ABOUT_SUCCESS:
      return {
        ...state,
        aboutText: payload,
        isLoadingAbout: false,
      };

    case CHANGE_IS_PUBLIC_VIEW:
      console.log(state.isPublicView, !state.isPublicView);
      return {
        ...state,
        isPublicView: !state.isPublicView,
      };

    default:
      return state;
  }
};

export default profileReducer;
