import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { getServicesSuccess, getServicesFailure } from '../actions/service';
import { getTimetableSuccess } from '../../timetable/actions';

import { GET_SERVICES_START } from '../types/service';
import getProfileId from '../../utils/get-profile-id';
import getState from '../../utils/get-auth-id';
import getAuthId from '../../utils/get-auth-id';

export function* getServices() {
  const profileId = yield select(getAuthId);

  try {
    const {
      data: { services, timetable },
    } = yield axios.get(`/profile/${profileId}/service`);

    yield put(getServicesSuccess({ services }));
    yield put(getTimetableSuccess({ timetable }));
  } catch (error) {
    yield put(getServicesFailure());
  }
}

export default function* onGetServices() {
  yield takeLatest(GET_SERVICES_START, getServices);
}
