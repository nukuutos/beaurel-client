import { call, all } from 'redux-saga/effects';

import onGetTimetable from './get-timetable';
import onGetTimetableAndAppointments from './get-timetable-and-appointments';

export default function* timetableSagas() {
  yield all([call(onGetTimetable), call(onGetTimetableAndAppointments)]);
}
