import React from 'react';

const getStartDateOfWeek = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());

const DatePicker = () => {
  const today = new Date();

  const todayDate = today.getDate(); // day of a month
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // get start day of a month
  const startDateOfCurrentMonth = new Date(todayDate, todayMonth, todayYear);
  // get start day of a week
  const startDateOfWeek = getStartDateOfWeek(startDateOfCurrentMonth);

  // get end day of a month
  const lastDayOfMonth = new Date(todayYear, todayMonth + 1, 0);
  // get end day of a week (this num is % 7 === 0)

  // render

  // const [startDay, setStartDay] = useState(getStartDateOfWeek(today)); // get first day of a week and work with it

  return <div></div>;
};

export default DatePicker;
