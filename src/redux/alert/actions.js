import { SET_ALERT, DELETE_ALERT } from './types';

export const setAlert = (alert) => ({
  type: SET_ALERT,
  payload: alert,
});

export const deleteAlert = () => ({
  type: DELETE_ALERT,
});
