import { GET_PROFILE_SUCCESS, UPDATE_ABOUT_SUCCESS, UPDATE_ABOUT_START, UPDATE_ABOUT_FAILURE } from './types';

const INITIAL_STATE = { isLoadingAbout: false }; // try every props get null (redirect)

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

    default:
      return state;
  }
};

export default profileReducer;
