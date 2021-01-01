import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { deleteWorkSuccess, deleteWorkFailure } from '../actions';
import { setAlert } from '../../alert/actions';

import { DELETE_WORK_START } from '../types';
import getToken from '../../utils/get-token';
import getProfileId from '../../utils/get-profile-id';

export function* deleteWork({ payload }) {
  try {
    const accessToken = yield select(getToken);
    const profileId = yield select(getProfileId);

    const { id } = payload;

    const { data } = yield axios.delete(`/profile/${profileId}/work/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    yield put(deleteWorkSuccess({ deletedWork: id }));
    yield put(setAlert(data));
  } catch (error) {
    yield put(deleteWorkFailure());
    yield put(setAlert({ message: error.response.data.message || error.message, type: 'fail' }));
  }
}

export default function* onDeleteService() {
  yield takeLatest(DELETE_WORK_START, deleteService);
}
