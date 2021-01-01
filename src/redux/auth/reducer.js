import { SIGN_IN_SUCCESS, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE, SIGN_IN_FAILURE, SIGN_OUT } from './types';

const INITIAL_STATE = {
  accessToken: null,
  role: null,
  id: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        ...payload,
      };

    case SIGN_IN_FAILURE:
    case REFRESH_TOKEN_FAILURE:
      return { ...state, accessToken: null, role: null, id: null };

    case SIGN_OUT:
      return { ...state, accessToken: null, role: null, id: null };

    default:
      return state;
  }
};

export default authReducer;
