exports.DAYS_OF_THE_WEEK = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

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

exports.getStartDayOfWeek = (date, day, weekDay) =>
  new Date(date.getFullYear(), date.getMonth(), day - weekDay).getDate();
