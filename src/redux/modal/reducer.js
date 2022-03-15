import { CLOSE_MODAL, SET_MODAL_CLOSE_FUNCTION } from './types';

const INITIAL_STATE = {
  close: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL_CLOSE_FUNCTION: {
      return {
        ...state,
        close: payload,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
