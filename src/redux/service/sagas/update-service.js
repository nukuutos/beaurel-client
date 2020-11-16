import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { updateServiceSuccess, updateServiceFailure } from '../actions';
import { setAlert } from '../../alert/actions';

import { UPDATE_SERVICE_START } from '../types';
import getToken from '../../utils/get-token';

export function* updateService({ payload }) {
  try {
    const accessToken = yield select(getToken);
    const { type, service, date } = payload; // !!!(how it goes in components)

    const { title, ...serviceProps } = service;
    const serviceWithoutTitle = { ...serviceProps };

    // parameter - service with sub services (in payload: service.title)
    // service (in payload: service.id)
    // sub service (in payload: service.id and service.parentId)
    const { data } = yield axios.put(
      `/profile/5eb849b81c2ccc21306ced34/service/${type === 'parameter' ? service.oldTitle : service.id}`,
      { service: type === 'sub-service' ? serviceWithoutTitle : service, date },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    yield put(updateServiceSuccess({ updatedService: service, updatedServiceType: type }));
    yield put(setAlert(data));
  } catch (error) {
    yield put(updateServiceFailure());
    yield put(setAlert({ message: error.response.data.message || error.message, type: 'fail' }));
  }
}

export default function* onUpdateService() {
  yield takeLatest(UPDATE_SERVICE_START, updateService);
}
