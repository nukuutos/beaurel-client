import { GET_REVIEWS_SUCCESS } from './types';

const INITIAL_STATE = {};

const serviceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS_SUCCESS:
      const { reviews } = payload;
      return {
        ...state,
        reviews,
      };

    default:
      return state;
  }
};

export default serviceReducer;
