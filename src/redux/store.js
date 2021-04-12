import { applyMiddleware, createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import logger from 'redux-logger';

import combinedReducer from './reducer';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const rootReducer = (state, action) => {
  const { type, payload } = action;

  if (type === HYDRATE) {
    // overwright state from server
    const nextState = {
      ...state,
      ...payload,
    };

    if (!payload.auth.accessToken) nextState.auth = state.auth;

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => createStore(rootReducer, bindMiddleware([logger]));

export const wrapper = createWrapper(initStore);
