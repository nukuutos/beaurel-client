import { combineReducers } from 'redux';

import profileReducer from './profile/reducer';
import authReducer from './auth/reducer';
import serviceReducer from './service/reducer/reducer';
import timetableReducer from './timetable/reducer';
import workReducer from './work/reducer';
import appointmentsReducer from './appointments/reducer';
import screenSizeReducer from './screen-size/reducer';
import favoritesReducer from './favorites/reducer';
import messagesReducer from './messages/reducer';
import masterToolsReducer from './master-tools/reducer';
import timezoneReducer from './timezone/reducer';
import routingReducer from './routing/reducer';
import modalReducer from './modal/reducer';
import alertsReducer from './alerts/reducer';

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  services: serviceReducer,
  timetable: timetableReducer,
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
