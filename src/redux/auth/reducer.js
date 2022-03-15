import {
  SIGN_IN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  SIGN_OUT,
  SET_AUTH_DATA,
} from './types';

const INITIAL_STATE = {
  accessToken: null,
  role: null,
  id: null,

  username: null,
  firstName: null,
  lastName: null,
  phone: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }

    case SIGN_OUT:
    case REFRESH_TOKEN_FAILURE: {
      return { ...state, accessToken: null, role: null, id: null };
    }

    case SET_AUTH_DATA: {
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};

export default authReducer;
