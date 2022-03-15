import { CHANGE_PAGE_FINISH, CHANGE_PAGE_START } from './types';

const INITIAL_STATE = {
  isLoading: false,
  url: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_PAGE_START: {
      return {
        ...state,
        isLoading: true,
        url: payload,
      };
    }

    case CHANGE_PAGE_FINISH: {
      return { ...state, isLoading: false };
    }

    default:
      return state;
  }
};

export default authReducer;
