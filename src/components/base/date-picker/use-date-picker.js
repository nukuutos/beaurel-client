import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getCalendarPageDates,
  getCurrentMonthAndYear,
  getFirstAndLastDatesOfMonth,
} from '../../pages/profile/section-cards/booking/booking-timetable/booking-timetable-phone/utils';

const getMonthAndYear = (date) => [date.getMonth(), date.getFullYear()];

// case: 0 || 6
// it's because of sunday. Sunday in russia is a last day of a week
const getStartDateOfWeek = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 6) + 1);

const getEndDateOfWeek = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 6) + 6);

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

  let date = firstDate.clone();

  while (!date.isAfter(lastDate)) {
    const week = [];

    for (let i = 0; i <= 6; i++) {
      week.push(date);
      date = date.add(1, 'day');
    }

    weeks.push(week);
  }

  return weeks;
};

const useDatePicker = () => {
  const { timezone } = useSelector((state) => state.timetable);

  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(getCurrentMonthAndYear(timezone)); // [month, year]

  const monthDates = getFirstAndLastDatesOfMonth(...currentMonthAndYear);
  const pageDates = getCalendarPageDates(...monthDates);

  const dates = generateDates(...pageDates);

  return [dates, monthDates, setCurrentMonthAndYear];
};

export default useDatePicker;
