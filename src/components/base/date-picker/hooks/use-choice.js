import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getToday } from '../../../../utils/dayjs';
import { getTomorrow } from '../utils';

const useChoice = ({ handleClicks, monthDates }) => {
  const { timezone } = useSelector((state) => state.timetable);
  const tomorrow = getTomorrow();

  const [choice, setChoice] = useState(tomorrow);
  const { handleNext, handlePrev } = handleClicks;

  const handleClick = (date) => {
    const [firstDate, lastDate] = monthDates;

    const today = getToday(timezone);

    if (date.isBefore(today)) return;

    if (date.isBefore(firstDate)) return handlePrev;

    if (date.isAfter(lastDate)) return handleNext;

    setChoice(date);
  };

  return [choice, handleClick];
};

export default useChoice;
