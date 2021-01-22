import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { deleteServiceSuccess, deleteServiceFailure } from '../actions/service';
import { setAlert } from '../../alert/actions';

import { DELETE_SERVICE_START } from '../types/service';
import getToken from '../../utils/get-token';
import getProfileId from '../../utils/get-profile-id';

export function* deleteService({ payload }) {
  try {
    const accessToken = yield select(getToken);
    const profileId = yield select(getProfileId);

    const { type, service } = payload;

    // parameter - service with sub services (in payload: service.title)
    // service (in payload: service.id)
    // sub service (in payload: service.id and service.parentId)
    const { data } = yield axios.delete(
      `/profile/${profileId}/service/${type === 'parameter' ? service.title : service.id}`,
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
