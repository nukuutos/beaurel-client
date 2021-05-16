import { useState } from 'react';

const getMonthAndYear = (date) => [date.getMonth(), date.getFullYear()];

// case: 0 || 6
// it's because of sunday. Sunday in russia is a last day of a week
const getStartDateOfWeek = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 6) + 1);
};

const getEndDateOfWeek = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 6) + 6);
};

const getFirstAndLastDates = (month, year) => {
  const firstDateOfCurrentMonth = new Date(year, month, 1);
  const lastDateOfCurrentMonth = new Date(year, month + 1, 0);

  const firstDateOfCalendarPage = getStartDateOfWeek(firstDateOfCurrentMonth); // calendar

  const lastDateOfCalendarPage = getEndDateOfWeek(lastDateOfCurrentMonth);

  const calendarFirstAndLastDays = [firstDateOfCalendarPage, lastDateOfCalendarPage];
  const monthFirstAndLastDays = [firstDateOfCurrentMonth, lastDateOfCurrentMonth];

  return [calendarFirstAndLastDays, monthFirstAndLastDays];
};

const generateDates = (firstDate, lastDate) => {
  const weeks = [];

  lastDate = lastDate.getTime();

  while (firstDate.getTime() <= lastDate) {
    const week = [firstDate];

    for (let i = 1; i < 7; i++) {
      const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i);
      week.push(date);
    }
    weeks.push(week);

    firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 7);
  }

  return weeks;
};

const useDatePicker = () => {
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(getMonthAndYear(new Date())); // [month, year]

  const [calendarPageDates, currentMonthDates] = getFirstAndLastDates(...currentMonthAndYear);

  const [firstDate, lastDate] = calendarPageDates;

  const dates = generateDates(firstDate, lastDate);

  const setCurrentDate = (date) => setCurrentMonthAndYear(getMonthAndYear(date));
  return [dates, currentMonthDates, setCurrentDate];
};

export default useDatePicker;
