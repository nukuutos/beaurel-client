import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getCurrentWeekday } from './utils';

const useBookingTimetablePhone = (weekDays, setWeekByDate) => {
  const [dateCounter, setDateCounter] = useState((getCurrentWeekday() + 1) % 7); // date counter from today

  const isUnavailableWeek = weekDays.every(({ props }) => !props.availableAppointments);

  useEffect(() => {
    if (getCurrentWeekday() + 1 === 7) setWeekByDate((today) => today.weekday(7));
  }, []);

  const toPrevDay = () => {
    setDateCounter((i) => {
      i -= 1;

      if (i === -1) {
        setWeekByDate((today) => today.weekday(-7));
        return 6;
      }

      return i;
    });
  };

  const toNextDay = () => {
    setDateCounter((i) => {
      i += 1;

      if (i === weekDays.length) {
        setWeekByDate((today) => today.weekday(7));
        return 0;
      }

      return i;
    });
  };

  const toNextWeek = () => {
    setWeekByDate((today) => today.weekday(7));
    setDateCounter(0);
  };

  const swipeableSettings = {
    onSwipedLeft: toNextDay,
    onSwipedRight: toPrevDay,
    delta: 10,
  };

  const day = weekDays[dateCounter];
  const controllers = { toPrevDay, toNextDay, toNextWeek };
  const handlers = useSwipeable(isUnavailableWeek ? {} : swipeableSettings);

  return [day, isUnavailableWeek, controllers, handlers];
};

export default useBookingTimetablePhone;
