import { takeLatest, put, select } from 'redux-saga/effects';

import axios from '../../../utils/axios';

import { GET_MASTERS_START } from '../types';
import { getMastersSuccess, getMastersFailure } from '../actions';

import getToken from '../../utils/get-token';
import getAuthId from '../../utils/get-auth-id';

function* getMasters() {
  console.log(
    'biiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii\niiiiiiiiiiiiiiiiiiiiiiiiiiiiiii\nddddddddddddddddddddddddd\n'
  );

  try {
    const accessToken = yield select(getToken);
    const profileId = yield select(getAuthId);

    console.log('\nfuckkkkkkkkkkkkkkink\n');

    const { data } = yield axios.get(`/profile/${profileId}/master`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('fuckkkkkkkkkkkkkkink', data);

    yield put(getMastersSuccess(data));
  } catch (error) {
    yield put(getMastersFailure(error));
  }
}

export default function* onGetMasters() {
  yield takeLatest(GET_MASTERS_START, getMasters);
}
