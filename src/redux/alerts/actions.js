import { ADD_ALERT, DELETE_ALERT } from './types';

export const addAlert = (alert) => ({
  type: ADD_ALERT,
  payload: alert,
});

export const deleteAlert = () => ({
  type: DELETE_ALERT,
});
