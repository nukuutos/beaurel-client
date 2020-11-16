import { put, takeLatest } from 'redux-saga/effects';

import { refreshTokenSuccess, refreshTokenFailure } from '../actions';
import { REFRESH_TOKEN_START } from '../types';
import axios from '../../../utils/axios';

function* refreshToken() {
  try {
    const {
      data: { accessToken, role },
    } = yield axios.post('/auth/refresh-token');

    yield put(refreshTokenSuccess({ accessToken, role }));
  } catch (error) {
    yield put(refreshTokenFailure(error));
  }
}

export default function* onRefreshToken() {
  yield takeLatest(REFRESH_TOKEN_START, refreshToken);
}
