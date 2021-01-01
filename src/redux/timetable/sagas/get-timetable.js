import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { getTimetableSuccess, getTimetableFailure } from '../actions';

import { GET_TIMETABLE_START } from '../types';
import getProfileId from '../../utils/get-profile-id';

export function* getTimetable() {
  const profileId = yield select(getProfileId);

  try {
    console.log('!!!!!!!!!!!!!!!!!!!!');
    const { data } = yield axios.get(`/profile/${profileId}/timetable`);
    // console.log(data);
    yield put(getTimetableSuccess(data));
  } catch (error) {
    yield put(getTimetableFailure());
  }
}

export default function* onGetTimetable() {
  yield takeLatest(GET_TIMETABLE_START, getTimetable);
}
