import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { configureStore } from '@reduxjs/toolkit';
// import combinedReducer from './reducer';
import hydrateState from './hydrate-state';

import authReducer from './slices/auth';
import profileReducer from './slices/profile';
import serviceReducer from './slices/service/service';
import timetableReducer from './slices/timetable';
import workReducer from './slices/work';
import appointmentsReducer from './slices/appointments';
import screenSizeReducer from './slices/screen-size';
import favoritesReducer from './slices/favorites';
import messagesReducer from './slices/messages';
import masterToolsReducer from './slices/master-tools';
import timezoneReducer from './slices/timezone';
import routingReducer from './slices/routing';
import modalReducer from './slices/modal';
import alertsReducer from './slices/alerts';

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

const initStore = () =>
  configureStore({
    reducer: {
      // server
      auth: authReducer,
      profile: profileReducer,
      services: serviceReducer,
      timetable: timetableReducer,
      work: workReducer,
      appointments: appointmentsReducer,
      favorites: favoritesReducer,
      messages: messagesReducer,
      timezone: timezoneReducer,
      // client
      screenSize: screenSizeReducer,
      masterTools: masterToolsReducer,
      routing: routingReducer,
      modal: modalReducer,
      alerts: alertsReducer,
    },
  });

export const wrapper = createWrapper(initStore);
