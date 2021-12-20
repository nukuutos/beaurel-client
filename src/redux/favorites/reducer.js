import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from './types';

const INITIAL_STATE = [];

// eslint-disable-next-line default-param-last
const favoritesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FAVORITES: {
      return payload;
    }

    case ADD_FAVORITE: {
      const { newMasterId } = payload;
      return [...state, newMasterId];
    }

    case DELETE_FAVORITE: {
      const { deletedMasterId } = payload;
      return state.filter((id) => id !== deletedMasterId);
    }

    default:
      return state;
  }
};

export default favoritesReducer;
