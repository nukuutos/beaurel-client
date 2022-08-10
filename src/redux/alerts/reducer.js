import { v4 as uuidv4 } from 'uuid';
import { ADD_ALERT, DELETE_ALERT } from './types';

const INITIAL_STATE = [];

// eslint-disable-next-line default-param-last
const timezoneReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT: {
      return [...state, { ...payload, id: uuidv4() }];
    }

    case DELETE_ALERT: {
      return state.slice(0, -1);
    }

    default:
      return state;
  }
};

export default timezoneReducer;
