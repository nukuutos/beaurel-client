import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = { masterId: null, works: [] };

const slice = createSlice({
  name: 'work',
  initialState,
  reducers: {
    getWorks: (state, action) => {
      const { works, masterId } = action.payload;

      return {
        ...state,
        masterId,
        works,
      };
    },

    addWork: (state, action) => {
      const { work } = action.payload;

      return {
        ...state,
        works: [...state.works, work],
      };
    },

    updateWork: (state, action) => {
      const { updatedWork } = action.payload;

      const updatedWorks = state.works.map((work) => {
        // to for loop?
        if (work._id === updatedWork._id) return updatedWork;
        return work;
      });

      return {
        ...state,
        works: updatedWorks,
      };
    },

    deleteWork: (state, action) => {
      const { deletedId } = action.payload;

      return {
        ...state,
        works: state.works.filter((work) => work._id !== deletedId),
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.work,
    }),
  },
});

const { actions, reducer } = slice;

export const { getWorks, addWork, updateWork, deleteWork } = actions;

export default reducer;
