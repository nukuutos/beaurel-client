import { GET_REVIEWS_FAILURE, GET_REVIEWS_START, GET_REVIEWS_SUCCESS } from './types';

export const getReviewsStart = () => ({
  type: GET_REVIEWS_START,
});

export const getReviewsSuccess = (reviews) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getReviewsFailure = (error) => ({
  type: GET_REVIEWS_FAILURE,
  payload: error,
});
