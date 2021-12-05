import dayjs from 'dayjs';

export const getDataForUseWeek = (startDay) => {
  const month = startDay.month() + 1;
  const year = startDay.year();

  const startDayOfWeek = startDay.date(); // num
  const endDayOfWeek = startDayOfWeek + 6; // num

  return { month, year, startDayOfWeek, endDayOfWeek };
};

export const getToday = (timezone) => dayjs().tz(timezone).utc(true);
