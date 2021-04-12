import { GET_WORKS_SUCCESS, UPDATE_WORK_SUCCESS, ADD_WORK_SUCCESS, DELETE_WORK_SUCCESS } from './types';

export const getWorksSuccess = (works) => ({
  type: GET_WORKS_SUCCESS,
  payload: works,
});

export const updateWorkSuccess = (work) => ({
  type: UPDATE_WORK_SUCCESS,
  payload: work,
});

export const addWorkSuccess = (work) => ({
  type: ADD_WORK_SUCCESS,
  payload: work,
});

export const deleteWorkSuccess = (work) => ({
  type: DELETE_WORK_SUCCESS,
  payload: work,
});
