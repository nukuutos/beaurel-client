import dayjs from 'dayjs';

const getMessageTime = (createdAt) => {
  const dateDayjs = dayjs(createdAt).utc(true);

  const [hour, minute] = [dateDayjs.hour(), dateDayjs.minute()];

  const stringMinutes = minute < 10 ? `0${minute}` : minute;
  const stringHours = hour < 10 ? `0${hour}` : hour;
  const displayTime = `${stringHours}:${stringMinutes}`;

  return displayTime;
};

export default getMessageTime;
