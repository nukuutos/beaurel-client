import getDateInfo from './get-date-info';

const MONTHS = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

const getMessageDate = ({ createdAt, nextMessageDate }) => {
  const currentMessageDateInfo = getDateInfo(createdAt);
  const [date, month] = currentMessageDateInfo;
  const displayDate = `${date} ${MONTHS[month]}`;

  if (!nextMessageDate) return [true, displayDate];

  const nextMessageDateInfo = getDateInfo(nextMessageDate);

  const currentDateString = currentMessageDateInfo.join('');
  const nextDateString = nextMessageDateInfo.join('');

  const isDateToDisplay = currentDateString !== nextDateString;

  return [isDateToDisplay, displayDate];
};

export default getMessageDate;
