import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { addServiceSuccess, addServiceFailure } from './../actions';
import { setAlert } from '../../alert/actions';

import { ADD_SERVICE_START } from './../types';
import getToken from '../../utils/get-token';

export function* addService({ payload }) {
  try {
    const accessToken = yield select(getToken);
    const { date, ...service } = payload;

    const {
      data: { ids, ...alert },
    } = yield axios.post(
      '/profile/5eb849b81c2ccc21306ced34/service',
      { service, date },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    yield put(addServiceSuccess({ service: { ids, ...service } }));
    yield put(setAlert(alert));
  } catch (error) {
    yield put(addServiceFailure());
    yield put(setAlert({ ...error.response.data }));
  }
}

export default function* onAddService() {
  yield takeLatest(ADD_SERVICE_START, addService);
}
