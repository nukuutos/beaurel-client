import {
  GET_WORKS_START,
  GET_WORKS_SUCCESS,
  GET_WORKS_FAILURE,
  UPDATE_WORK_START,
  UPDATE_WORK_SUCCESS,
  UPDATE_WORK_FAILURE,
  ADD_WORK_START,
  ADD_WORK_SUCCESS,
  ADD_WORK_FAILURE,
  DELETE_WORK_START,
  DELETE_WORK_SUCCESS,
  DELETE_WORK_FAILURE,
} from './types';

export const getWorksStart = () => ({
  type: GET_WORKS_START,
});

export const getWorksSuccess = (works) => ({
  type: GET_WORKS_SUCCESS,
  payload: works,
});

export const getWorksFailure = () => ({
  type: GET_WORKS_FAILURE,
});

//

export const updateWorkStart = (work) => ({
  type: UPDATE_WORK_START,
  payload: work,
});

export const updateWorkSuccess = (work) => ({
  type: UPDATE_WORK_SUCCESS,
  payload: work,
});

export const updateWorkFailure = () => ({
  type: UPDATE_WORK_FAILURE,
});

//

export const addWorkStart = (work) => ({
  type: ADD_WORK_START,
  payload: work,
});

export const addWorkSuccess = (work) => ({
  type: ADD_WORK_SUCCESS,
  payload: work,
});

export const addWorkFailure = () => ({
  type: ADD_WORK_FAILURE,
});

//

export const deleteWorkStart = (work) => ({
  type: DELETE_WORK_START,
  payload: work,
});

export const deleteWorkSuccess = (work) => ({
  type: DELETE_WORK_SUCCESS,
  payload: work,
});

export const deleteWorkFailure = () => ({
  type: DELETE_WORK_FAILURE,
});
