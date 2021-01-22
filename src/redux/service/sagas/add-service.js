import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { addServiceSuccess, addServiceFailure } from './../actions/service';
import { setAlert } from '../../alert/actions';

import { ADD_SERVICE_START } from './../types/service';
import getToken from '../../utils/get-token';
import getProfileId from '../../utils/get-profile-id';

export function* addService({ payload }) {
  try {
    const accessToken = yield select(getToken);
    const profileId = yield select(getProfileId);

    const { date, ...service } = payload;

    const {
      data: { ids, ...alert },
    } = yield axios.post(
      `/profile/${profileId}/service`,
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
