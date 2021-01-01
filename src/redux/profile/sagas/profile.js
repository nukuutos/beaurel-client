import { takeLatest, put, select } from 'redux-saga/effects';

import axios from '../../../utils/axios';

import { GET_PROFILE_START } from '../types';
import { getProfileSuccess, getProfileFailure } from '../actions';

import getToken from '../../utils/get-token';

function* getProfile({ payload: { id } }) {
  try {
    const accessToken = yield select(getToken);

    const { data } = yield axios.get(`/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    yield put(getProfileSuccess({ profile: { ...data, id } }));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

export default function* onGetProfile() {
  yield takeLatest(GET_PROFILE_START, getProfile);
}
