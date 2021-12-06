const convertDateToString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const stringDay = String(day).length === 2 ? day : `0${day}`;
  const stringMonth = String(month).length === 2 ? month : `0${month}`;
  const year = String(date.getFullYear());

  // 28.12.21
  return `${stringDay}.${stringMonth}.${year[2]}${year[3]}`;
};

export default convertDateToString;
