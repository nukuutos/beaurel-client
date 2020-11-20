import { takeLatest, put } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { getServicesSuccess, getServicesFailure } from '../actions';
import { getTimetableSuccess } from '../../timetable/actions';

import { GET_SERVICES_START } from '../types';

export function* getServices() {
  try {
    const {
      data: { services, timetable },
    } = yield axios.get('/profile/5eb849b81c2ccc21306ced34/service');

    yield put(getServicesSuccess({ services }));
    yield put(getTimetableSuccess({ timetable }));
  } catch (error) {
    yield put(getServicesFailure());
  }
}

export default function* onGetServices() {
  yield takeLatest(GET_SERVICES_START, getServices);
}
