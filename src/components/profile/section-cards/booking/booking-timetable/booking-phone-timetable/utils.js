import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekday from "dayjs/plugin/weekday";
import en from "dayjs/locale/en";

dayjs.locale({
  ...en,
  weekStart: 1,
});

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);

export const getCurrentWeekday = () => {
  return dayjs().weekday();
};

export const getWeekday = (date) => {
  return dayjs(date).weekday();
};

export const getToday = (timezone) => {
  return dayjs().tz(timezone);
};

// export const getTommorow = (timezone) => {
//   console.log(dayjs().add(1, "day").tz(timezone).format(), dayjs().tz(timezone).add(1, "day").format());

//   return dayjs().add(1, "day").tz(timezone);
// };

export const getDateUTC = (string = undefined) => {
  // not work with null
  return dayjs(string).utc(true);
};

export const getTodayUTC = () => {
  const date = dayjs().add(dayjs().utcOffset(), "m").utcOffset(0).second(0).minute(0).hour(0);

  return date;
};

export const toDayjs = (date) => dayjs(date);

export const getUpdateDate = (update) => {
  if (!update.date) return null;

  const updateDate = getDateUTC(update.date);

  return updateDate;
};

export const getCurrentMonthAndYear = (timezone) => {
  const today = getToday(timezone);
  return [today.month(), today.year()];
};

export const getFirstAndLastDatesOfMonth = (month, year) => {
  const date = getDateUTC(`${year}-${month + 1}-01`);

  return [date, date.endOf("month")];
};

export const getCalendarPageDates = (firstDateMonth, lastDateMonth) => {
  const firstPageDate = firstDateMonth.weekday(0);
  const lastPageDate = lastDateMonth.weekday(6);

  return [firstPageDate, lastPageDate];
};

export const getTommorow = () => {
  const date = getTodayUTC();

  console.log(date.add(1, "day").format());

  return date.add(1, "day");
};
