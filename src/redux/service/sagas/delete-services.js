import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { deleteServiceSuccess, deleteServiceFailure } from '../actions';
import { setAlert } from '../../alert/actions';

import { DELETE_SERVICE_START } from '../types';
import getToken from '../../utils/get-token';

export function* deleteService({ payload }) {
  try {
    const accessToken = yield select(getToken);
    const { type, service } = payload;

    // parameter - service with sub services (in payload: service.title)
    // service (in payload: service.id)
    // sub service (in payload: service.id and service.parentId)
    console.log(payload);
    const { data } = yield axios.delete(
      `/profile/5eb849b81c2ccc21306ced34/service/${type === 'parameter' ? service.title : service.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    yield put(deleteServiceSuccess({ deletedService: service, serviceType: type }));
    yield put(setAlert(data));
  } catch (error) {
    yield put(deleteServiceFailure());
    yield put(setAlert({ message: error.response.data.message || error.message, type: 'fail' }));
  }
}

export default function* onDeleteService() {
  yield takeLatest(DELETE_SERVICE_START, deleteService);
}
