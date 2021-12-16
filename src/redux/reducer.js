import { combineReducers } from 'redux';

import profileReducer from './profile/reducer';
import authReducer from './auth/reducer';
import alertReducer from './alert/reducer';
import serviceReducer from './service/reducer/reducer';
import timetableReducer from './timetable/reducer';
import workReducer from './work/reducer';
import appointmentsReducer from './appointments/reducer';
import screenSizeReducer from './screen-size/reducer';

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  alerts: alertReducer,
  services: serviceReducer,
  timetable: timetableReducer,
  work: workReducer,
  appointments: appointmentsReducer,
  screenSize: screenSizeReducer,
});
