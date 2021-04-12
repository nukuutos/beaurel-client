exports.DAYS_OF_THE_WEEK = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

exports.MONTHS = [
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

exports.getWeekDayRU = (weekDayNumEN) => {
  const weekdaysCount = 7;

  let weekDayNumRU = weekDayNumEN - 1;
  if (weekDayNumRU < 0) weekDayNumRU += weekdaysCount; // or just num = 6

  return weekDayNumRU;
};

// 25
exports.getStartDayOfWeek = (date, day, weekDay) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()).getDate();

// 22-12-20
exports.getStartDateOfWeek = (date, day, weekDay) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
