import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = { isServices: false, isTimetable: false, isOpen: false, isViewed: false };

const slice = createSlice({
  name: 'master-tools',
  initialState,
  reducers: {
    setMasterTools: (state, action) => {
      const { isServices, isTimetable } = action.payload;
      const isOpen = (!isServices || !isTimetable) && !state.isViewed;

      return {
        ...state,
        isServices,
        isTimetable,
        isOpen,
        isViewed: true,
      };
    },

    setTimetableTool: (state) => ({
      ...state,
      isTimetable: true,
      isOpen: true,
      isViewed: false,
    }),

    closeMasterTools: (state) => ({
      ...state,
      isOpen: false,
    }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (state.isViewed) return state;

      return {
        ...state,
        ...action.payload.masterTools,
      };
    },
  },
});

const { actions, reducer } = slice;

export const { setMasterTools, setTimetableTool, closeMasterTools } = actions;

export default reducer;
