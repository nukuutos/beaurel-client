import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import axios from '../../utils/axios';

import { getReviewsFailure, getReviewsSuccess } from './actions';

import { GET_REVIEWS_START } from './types';
import getProfileId from '../utils/get-profile-id';

const getToken = (state) => state.auth.accessToken;

export function* getReviews() {
  try {
    const accessToken = yield select(getToken);
    const profileId = yield select(getProfileId);

    const { data } = yield axios.get(`/profile/${profileId}/rating`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    yield put(getReviewsSuccess({ reviews: data }));
  } catch (error) {
    yield put(getReviewsFailure(error));
  }
}

export function* onGetReviews() {
  yield takeLatest(GET_REVIEWS_START, getReviews);
}

export default function* reviewSagas() {
  yield all([call(onGetReviews)]);
}
