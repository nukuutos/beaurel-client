import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES, GET_FAVORITES_ON_SCROLL } from './types';

const INITIAL_STATE = [];

// eslint-disable-next-line default-param-last
const favoritesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FAVORITES: {
      return payload;
    }

    case ADD_FAVORITE: {
      const { newFavoriteMaster } = payload;
      return [...state, newFavoriteMaster];
    }

    case DELETE_FAVORITE: {
      const { deletedMasterId } = payload;
      return state.filter((master) => master._id !== deletedMasterId);
    }

    case GET_FAVORITES_ON_SCROLL: {
      return [...state, ...payload];
    }

    default:
      return state;
  }
};

export default favoritesReducer;
