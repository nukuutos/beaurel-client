import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import logger from 'redux-logger';

import combinedReducer from './reducer';
import rootSaga from './saga';

const bindMiddleware = (middleware) => {
  // if (process.env.NODE_ENV !== 'production') {
  const { composeWithDevTools } = require('redux-devtools-extension');
  return composeWithDevTools(applyMiddleware(...middleware));
  // }
  // return applyMiddleware(...middleware);
};

const rootReducer = (state, action) => {
  const { type, payload } = action;

  if (type === HYDRATE) {
    // overwright state from server
    const nextState = {
      ...state,
      ...payload,
    };

    if (!payload.auth.accessToken) {
      nextState.auth.accessToken = state.auth.accessToken;
      nextState.auth.role = state.auth.role;
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([logger, sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore);
