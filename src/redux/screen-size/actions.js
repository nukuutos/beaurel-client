import { CHANGE_SCREEN_SIZE } from './types';

export const changeScreenSize = (deviceData) => ({
  type: CHANGE_SCREEN_SIZE,
  payload: deviceData,
});
