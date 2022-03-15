import { SET_MODAL_CLOSE_FUNCTION } from './types';

export const setModalCloseFunction = (closeFunction) => ({
  type: SET_MODAL_CLOSE_FUNCTION,
  payload: closeFunction,
});
