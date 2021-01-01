import Router from 'next/router';
import { put, call, takeLatest } from 'redux-saga/effects';

import { signInFailure, signInSuccess } from '../actions';
import { SIGN_IN_START } from '../types';
import axios from '../../../utils/axios';

function* signIn({ payload }) {
  try {
    const {
      data: { accessToken, role, id },
    } = yield axios.post('http://localhost:5000/api/v1/auth/sign-in', payload);

    yield put(signInSuccess({ accessToken, role, id }));
    yield call(Router.push, `/profile/${id}`);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export default function* onSignIn() {
  yield takeLatest(SIGN_IN_START, signIn);
}
