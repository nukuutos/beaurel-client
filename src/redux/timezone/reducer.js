import { SET_CITY_AND_TIMEZONE } from './types';

const INITIAL_STATE = { city: null, timezone: null };

// eslint-disable-next-line default-param-last
const timezoneReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CITY_AND_TIMEZONE: {
      const { city, timezone } = payload;
      return { ...state, city, timezone };
    }

    default:
      return state;
  }
};

export default timezoneReducer;
