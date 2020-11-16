import { SET_ALERT, DELETE_ALERT } from './types';

const INITIAL_STATE = [];

const alertReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case DELETE_ALERT:
      return state.filter((alert, i) => i !== 0);

    default:
      return state;
  }
};

export default alertReducer;
