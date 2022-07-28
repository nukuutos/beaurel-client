import { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useTimeFrame from '../use-week/use-time-frame';
import { getCurrentWeekday } from './utils';

const useBookingTimetablePhone = (setWeekByDate) => {
  const [weekdayIndex, setWeekdayIndex] = useState(getCurrentWeekday()); // date counter from today
  const { fromDate } = useTimeFrame();

  const toPrevDay = () => {
    setWeekdayIndex((i) => {
      i -= 1;

      if (i === -1) {
        setWeekByDate((today) => today.weekday(-7));
        return 6;
      }

      return i;
    });
  };

  const toNextDay = useCallback(() => {
    setWeekdayIndex((i) => {
      i += 1;

      if (i === 7) {
        setWeekByDate((today) => today.weekday(7));
        return 0;
      }

      return i;
    });
  }, [setWeekByDate]);

  const toNextWeek = () => {
    setWeekByDate((today) => today.weekday(7));
    setWeekdayIndex(0);
  };

  // useEffect(() => {
  //   if (!fromDate) toNextDay();
  //   else setWeekdayIndex(fromDate.weekday());
  // }, [toNextDay, fromDate]);

  const controllers = { toPrevDay, toNextDay, toNextWeek };

  return [weekdayIndex, controllers];
};

export default useBookingTimetablePhone;
