import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from './types';

export const getFavorites = (masters) => ({
  type: GET_FAVORITES,
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
