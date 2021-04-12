import {
  GET_PROFILE_SUCCESS,
  UPDATE_ABOUT_SUCCESS,
  CHANGE_IS_PUBLIC_VIEW,
  UPDATE_AVATAR_SUCCESS,
  GET_MASTERS_SUCCESS,
  ADD_MASTER,
  DELETE_MASTER,
} from './types';

const INITIAL_STATE = {
  isPublicView: false,
  ratingStats: { ratingCounters: [] },
  lastName: '',
  masters: [],
  reviews: [],
  id: null,
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

    case UPDATE_ABOUT_SUCCESS:
      return {
        ...state,
        aboutText: payload,
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
      // wtd with destrucutre?
      // instead of array of strings I get array of aggregation fucntions after destructuring

      return {
        ...state,
        masters: payload.favoriteMasters,
      };

    case ADD_MASTER:
      const { newMasterId } = payload;
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
