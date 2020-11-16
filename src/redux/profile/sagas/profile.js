import { takeLatest, put, select } from 'redux-saga/effects';

import axios from '../../../utils/axios';

import { GET_PROFILE_START } from '../types';
import { getProfileSuccess, getProfileFailure } from '../actions';

import getToken from '../../utils/get-token';

function* getProfile() {
  try {
    const accessToken = yield select(getToken);

    const { data } = yield axios.get('/profile/5eb849b81c2ccc21306ced34', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    yield put(getProfileSuccess({ profile: data }));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

export default function* onGetProfile() {
  yield takeLatest(GET_PROFILE_START, getProfile);
}
