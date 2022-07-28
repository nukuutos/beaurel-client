import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getToday } from './use-week/utils';

const useStartDay = () => {
  const { timezone } = useSelector((state) => state.timetable);

  const today = getToday(timezone);

  const [startDay, setStartDay] = useState(today.weekday(0));

  return [{ today, startDay }, setStartDay];
};

export default useStartDay;
