// convert date to string format of server
const convertDateToString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const stringDay = String(day).length === 2 ? day : '0' + day;
  const stringMonth = String(month).length === 2 ? month : '0' + month;
  const year = date.getFullYear();

  return stringDay + '-' + stringMonth + '-' + year;
};

export default convertDateToString;
