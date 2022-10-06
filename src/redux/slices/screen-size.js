import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isDesktop: true,
  isTabLand: false,
  isTabPort: false,
  isPhone: false,
};

const slice = createSlice({
  name: 'screenSize',
  initialState,
  reducers: {
    changeScreenSize: (state, action) => {
      const { isDeviceName } = action.payload;

      const copiedState = { ...state };

      for (const key in copiedState) {
        copiedState[key] = false;
      }

      copiedState[isDeviceName] = true;

      return { ...copiedState };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.screenSize,
    }),
  },
});

const { actions, reducer } = slice;

export const { changeScreenSize } = actions;

export default reducer;
