import { CHANGE_SCREEN_SIZE } from './types';

const INITIAL_STATE = {
  isDesktop: true,
  isTabLand: false,
  isTabPort: false,
  isPhone: false,
};

// eslint-disable-next-line default-param-last
const screenSizeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SCREEN_SIZE: {
      const { isDeviceName } = payload;

      const copiedState = { ...state };

      for (const key in copiedState) {
        copiedState[key] = false;
      }

      copiedState[isDeviceName] = true;

      return { ...copiedState };
    }
    default:
      return state;
  }
};

export default screenSizeReducer;
