import dayjs from 'dayjs';
import MONTHS from './months';

const getTime = (createdAt) => {
  if (createdAt.isYesterday()) return 'вчера';

  const currentDate = dayjs();
  const dialogLastActivity = [createdAt.date(), createdAt.month(), createdAt.year()].join('');
  const today = [currentDate.date(), currentDate.month(), currentDate.year()].join('');

  if (today !== dialogLastActivity) return `${createdAt.date()} ${MONTHS[createdAt.month()]}`;

  const [hour, minute] = [createdAt.hour(), createdAt.minute()];
  const stringMinutes = minute < 10 ? `0${minute}` : minute;
  const stringHours = hour < 10 ? `0${hour}` : hour;
  const time = `${stringHours}:${stringMinutes}`;

  return time;
};

export default getTime;
