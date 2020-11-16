import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from '../../utils/axios';

import { getTimetableSuccess, getTimetableFailure } from './actions';

import { GET_TIMETABLE_START } from './types';

export function* getTimetable() {
  try {
    console.log('!!!!!!!!!!!!!!!!!!!!');
    const { data } = yield axios.get('/profile/5eb849b81c2ccc21306ced34/timetable');
    // console.log(data);
    yield put(getTimetableSuccess(data));
  } catch (error) {
    yield put(getTimetableFailure());
  }
}

export function* onGetTimetable() {
  yield takeLatest(GET_TIMETABLE_START, getTimetable);
}

export default function* timetableSagas() {
  yield all([call(onGetTimetable)]);
}
