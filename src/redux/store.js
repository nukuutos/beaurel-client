import { applyMiddleware, createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { serialize, deserialize } from 'superjson';
import logger from 'redux-logger';

import combinedReducer from './reducer';
import hydrateState from './hydrate-state';

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
    const nextState = {
      ...state,
      ...payload,
    };

    const authState = hydrateState(state.auth, nextState.auth);

    nextState.auth = authState;

    // if (!payload.auth.accessToken) nextState = state.auth;
    if (!payload.services.masterId) nextState.services = state.services;

    nextState.screenSize = state.screenSize;

    return nextState;
  }
  return combinedReducer(state, action);
};

const initStore = () => createStore(rootReducer, bindMiddleware([logger]));

export const wrapper = createWrapper(initStore, {
  deserializeState: (state) => deserialize(state),
  serializeState: (state) => serialize(state),
});
