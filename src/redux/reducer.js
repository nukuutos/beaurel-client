import { combineReducers } from 'redux';

import profileReducer from './profile/reducer';
import authReducer from './auth/reducer';
// import reviewReducer from './review/reducer';
import alertReducer from './alert/reducer';
import serviceReducer from './service/reducer';
import timetableReducer from './timetable/reducer';
import workReducer from './work/reducer';
import appointmentsReducer from './appointments/reducer';

export default combineReducers({
  profile: profileReducer,
  auth: authReducer,
  // reviews: reviewReducer,
  alerts: alertReducer,
  services: serviceReducer,
  timetable: timetableReducer,
  work: workReducer,
  appointments: appointmentsReducer,
});
