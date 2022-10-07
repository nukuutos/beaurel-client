import { createSlice, current } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = [];

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    getFavorites: (state, action) => {
      state = [...action.payload];
      return state;
    },

    addFavorite: (state, action) => {
      const { newFavoriteMaster } = action.payload;
      return [...state, newFavoriteMaster];
    },

    deleteFavorite: (state, action) => {
      const { deletedMasterId } = action.payload;
      return state.filter((master) => master._id !== deletedMasterId);
    },

    getFavoritesOnScroll: (state, action) => [...state, ...action.payload],
  },

  extraReducers: {
    [HYDRATE]: (state, action) => action.payload.favorites,
  },
});

const { actions, reducer } = slice;

export const { getFavorites, addFavorite, deleteFavorite, getFavoritesOnScroll } = actions;

export default reducer;
