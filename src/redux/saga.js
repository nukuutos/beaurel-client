import { all, call } from 'redux-saga/effects';

import profileSagas from './profile/sagas';
import authSagas from './auth/sagas';
// import reviewSagas from './review/sagas';
import serviceSagas from './service/sagas';
import timetableSagas from './timetable/sagas';

export default function* rootSaga() {
  yield all([call(serviceSagas), call(profileSagas), call(authSagas), call(timetableSagas)]);
}
