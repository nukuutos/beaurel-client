import { ADD_ALERT, DELETE_ALERT } from './types';

const INITIAL_STATE = [];

// eslint-disable-next-line default-param-last
const timezoneReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT: {
      return [...state, payload];
    }

    case DELETE_ALERT: {
      return state.slice(0, -1);
    }

    default:
      return state;
  }
};

export default timezoneReducer;
