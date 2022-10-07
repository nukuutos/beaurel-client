import dayjs from 'dayjs';
import MONTHS from './months';

const getTime = (createdAt) => {
  const date = dayjs(createdAt).utc(true);

  if (date.isYesterday()) return 'вчера';

  const currentDate = dayjs();
  const dialogLastActivity = [date.date(), date.month(), date.year()].join('');
  const today = [currentDate.date(), currentDate.month(), currentDate.year()].join('');

  if (today !== dialogLastActivity) return `${date.date()} ${MONTHS[date.month()]}`;

  const [hour, minute] = [date.hour(), date.minute()];
  const stringMinutes = minute < 10 ? `0${minute}` : minute;
  const stringHours = hour < 10 ? `0${hour}` : hour;
  const time = `${stringHours}:${stringMinutes}`;

  return time;
};

export default getTime;
