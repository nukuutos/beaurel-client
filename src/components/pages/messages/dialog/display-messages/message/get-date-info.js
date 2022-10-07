import dayjs from 'dayjs';

const getDateInfo = (date) => {
  const dateDayjs = dayjs(date).utc(true);

  return [dateDayjs.date(), dateDayjs.month(), dateDayjs.year()];
};

export default getDateInfo;
