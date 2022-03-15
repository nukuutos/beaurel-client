import { SET_CITY_AND_TIMEZONE } from './types';

export const setCityAndTimezone = (cityAndTimezone) => ({
  type: SET_CITY_AND_TIMEZONE,
  payload: cityAndTimezone,
});
