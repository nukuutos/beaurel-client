import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES, GET_FAVORITES_ON_SCROLL } from './types';

export const getFavorites = (masters) => ({
  type: GET_FAVORITES,
  payload: masters,
});

export const getFavoritesOnScroll = (masters) => ({
  type: GET_FAVORITES_ON_SCROLL,
  payload: masters,
});

export const addFavorite = (masterId) => ({
  type: ADD_FAVORITE,
  payload: masterId,
});

export const deleteFavorite = (masterId) => ({
  type: DELETE_FAVORITE,
  payload: masterId,
});
