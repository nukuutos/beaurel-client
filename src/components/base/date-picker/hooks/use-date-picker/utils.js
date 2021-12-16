import { getDateUTC, getToday } from '../../../../../utils/dayjs';

export const getFirstAndLastDatesOfMonth = (month, year) => {
  const date = getDateUTC(`${year}-${month + 1}-01`);

  return [date, date.endOf('month')];
};

export const getCalendarPageDates = (firstDateMonth, lastDateMonth) => {
  const firstPageDate = firstDateMonth.weekday(0);
  const lastPageDate = lastDateMonth.weekday(6);

  return [firstPageDate, lastPageDate];
};

export const getCurrentMonthAndYear = (timezone) => {
  const today = getToday(timezone);
  return [today.month(), today.year()];
};
