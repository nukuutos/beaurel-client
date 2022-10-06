import { combineReducers } from 'redux';

// import profileReducer from './profile/reducer';
// import authReducer from './auth/reducer';
// import timetableReducer from './timetable/reducer';
import serviceReducer from './slices/service/service';
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

export default combineReducers({
  // profile: profileReducer,
  // auth: authReducer,
  // timetable: timetableReducer,
  services: serviceReducer,
  work: workReducer,
  appointments: appointmentsReducer,
  screenSize: screenSizeReducer,
  favorites: favoritesReducer,
  messages: messagesReducer,
  masterTools: masterToolsReducer,
  timezone: timezoneReducer,
  routing: routingReducer,
  modal: modalReducer,
  alerts: alertsReducer,
});
