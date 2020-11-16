import { takeLatest, put } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { getServicesSuccess, getServicesFailure } from '../actions';

import { GET_SERVICES_START } from '../types';

export function* getServices() {
  try {
    // const accessToken = yield select(getToken);
    const {
      data: { services },
    } = yield axios.get('/profile/5eb849b81c2ccc21306ced34/service');

    yield put(getServicesSuccess({ services }));
  } catch (error) {
    yield put(getServicesFailure(error));
  }
}

export default function* onGetServices() {
  yield takeLatest(GET_SERVICES_START, getServices);
}
