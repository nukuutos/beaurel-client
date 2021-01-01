import { takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../../utils/axios';

import { getWorksSuccess, getWorksFailure } from '../actions';

import { GET_WORKS_START } from '../types';
import getProfileId from '../../utils/get-profile-id';

export function* getWorks() {
  const profileId = yield select(getProfileId);

  try {
    const {
      data: { works },
    } = yield axios.get(`/profile/${profileId}/work`);

    yield put(getWorksSuccess({ works }));
  } catch (error) {
    yield put(getWorksFailure());
  }
}

export default function* onGetWorks() {
  yield takeLatest(GET_WORKS_START, getWorks);
}
