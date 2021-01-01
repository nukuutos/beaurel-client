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

// 25
exports.getStartDayOfWeek = (date, day, weekDay) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()).getDate();

// 22-12-20
exports.getStartDateOfWeek = (date, day, weekDay) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
