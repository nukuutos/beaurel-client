import {
  GET_PROFILE_SUCCESS,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_START,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
  GET_MASTERS_SUCCESS,
  ADD_MASTER,
  DELETE_MASTER,
} from './types';

const INITIAL_STATE = {
  isLoadingAbout: false,
  isPublicView: false,
  ratingStats: { ratingCounters: [] },
  lastName: '',
  masters: [],
}; // try every props get null (redirect)

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

    case UPDATE_AVATAR_SUCCESS:
      const { avatar } = payload;

      return {
        ...state,
        avatar,
      };

    case CHANGE_IS_PUBLIC_VIEW:
      return {
        ...state,
        isPublicView: !state.isPublicView,
      };

    case GET_MASTERS_SUCCESS:
      const { data } = payload;
      console.log(data);

      return {
        ...state,
        masters: data.favoriteMasters[0].masters,
      };

    case ADD_MASTER:
      const { newMasterId } = payload;
      console.log(payload);
      return {
        ...state,
        masters: [...state.masters, newMasterId],
      };

    case DELETE_MASTER:
      const { deletedMasterId } = payload;
      console.log(payload);

      return {
        ...state,
        masters: state.masters.filter((id) => id !== deletedMasterId),
      };

    default:
      return state;
  }
};

export default profileReducer;
