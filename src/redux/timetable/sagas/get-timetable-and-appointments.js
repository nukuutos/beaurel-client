import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { getTimetableSuccess, getTimetableAndAppointmentsFailure } from '../actions';

import { GET_TIMETABLE_START, GET_TIMETABLE_AND_APPOINTMENTS_START } from '../types';
import { getAppointmentsSuccess } from '../../appointments/actions';
import getProfileId from '../../utils/get-profile-id';

export function* getTimetableAndAppointments() {
  const profileId = yield select(getProfileId);

  try {
    const {
      data: { timetable, appointments },
    } = yield axios.get(`/profile/${profileId}/timetable/appointment`);

    yield put(getTimetableSuccess({ timetable }));
    yield put(getAppointmentsSuccess({ appointments }));
  } catch (error) {
    yield put(getTimetableAndAppointmentsFailure());
  }
}

export default function* onGetTimetableAndAppointments() {
  yield takeLatest(GET_TIMETABLE_AND_APPOINTMENTS_START, getTimetableAndAppointments);
}
