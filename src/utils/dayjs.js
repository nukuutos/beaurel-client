import dayjs from 'dayjs';

export const getDateUTC = (string = undefined) => dayjs(string).utc(true);
export const getToday = (timezone) => dayjs().tz(timezone);
