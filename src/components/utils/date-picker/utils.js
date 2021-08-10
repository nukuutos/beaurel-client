import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const toUTCDate = (date) => {
  date = dayjs(date).add(dayjs(date).utcOffset(), "m").utcOffset(0).second(0).minute(0).hour(0);

  return date;
};
