import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { UPDATE_ABOUT_START } from '../types';
import { updateAboutSuccess, updateAboutFailure } from '../actions';

import { setAlert } from '../../alert/actions';

import getToken from '../../utils/get-token';

function* updateAboutText({ payload }) {
  try {
    const accessToken = yield select(getToken);

    const { data } = yield axios.patch(
      '/profile/5eb849b81c2ccc21306ced34',
      { aboutText: payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    yield put(updateAboutSuccess(payload));
    yield put(setAlert(data));
  } catch (error) {
    yield put(updateAboutFailure());
  }
}

export default function* onUpdateAboutText() {
  yield takeLatest(UPDATE_ABOUT_START, updateAboutText);
}
