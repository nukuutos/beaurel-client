import { applyMiddleware, createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import combinedReducer from './reducer';
import hydrateState from './hydrate-state';

const bindMiddleware = (middleware) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
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

    const messagesState = hydrateState(
      state.messages.activeInterlocutor,
      nextState.messages.activeInterlocutor
    );

    nextState.auth = authState;
    nextState.messages.activeInterlocutor = messagesState;

    // if (!payload.auth.accessToken) nextState = state.auth;
    if (!payload.services.masterId) nextState.services = state.services;
    if (state.masterTools.isViewed) nextState.masterTools = state.masterTools;
    // if (state.timezone.city)
    nextState.timezone = state.timezone;
    nextState.screenSize = state.screenSize;
    nextState.modal = state.modal;

    return nextState;
  }
  return combinedReducer(state, action);
};

// const initStore = () => createStore(rootReducer, bindMiddleware([logger]));
const initStore = () => createStore(rootReducer, bindMiddleware([]));

// export const wrapper = createWrapper(initStore, {
//   deserializeState: (state) => deserialize(state),
//   serializeState: (state) => serialize(state),
// });

export const wrapper = createWrapper(initStore);
