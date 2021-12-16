import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCalendarPageDates, getCurrentMonthAndYear, getFirstAndLastDatesOfMonth } from './utils';

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

  const [month, year] = getCurrentMonthAndYear(timezone);
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState([month, year]);

  const monthDates = getFirstAndLastDatesOfMonth(...currentMonthAndYear);
  const pageDates = getCalendarPageDates(...monthDates);
  const dates = generateDates(...pageDates);

  const handleNext = () => setCurrentMonthAndYear((state) => [state[0] + 1, state[1]]);
  const handlePrev = () => setCurrentMonthAndYear((state) => [state[0] - 1, state[1]]);

  const handleClicks = { handleNext, handlePrev };

  return [dates, monthDates, handleClicks];
};

export default useDatePicker;
