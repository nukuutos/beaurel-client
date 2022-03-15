import { CHANGE_PAGE_FINISH, CHANGE_PAGE_START } from './types';

export const changePageStart = (url) => ({
  type: CHANGE_PAGE_START,
  payload: url,
});

export const changePageFinish = () => ({
  type: CHANGE_PAGE_FINISH,
});
