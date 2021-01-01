import { put, takeLatest } from 'redux-saga/effects';

import { refreshTokenSuccess, refreshTokenFailure } from '../actions';
import { REFRESH_TOKEN_START } from '../types';
import axios from '../../../utils/axios';

function* refreshToken() {
  try {
    const { data } = yield axios.post('/auth/refresh-token');
    console.log(data);
    yield put(refreshTokenSuccess(data));
  } catch (error) {
    yield put(refreshTokenFailure(error));
  }
}

export default function* onRefreshToken() {
  yield takeLatest(REFRESH_TOKEN_START, refreshToken);
}
