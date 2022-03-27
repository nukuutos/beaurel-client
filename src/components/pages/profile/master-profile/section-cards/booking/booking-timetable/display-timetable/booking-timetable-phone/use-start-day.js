import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getToday } from '../use-week/utils';

const useStartDay = () => {
  const [{ timezone, update }, { service }] = useSelector((state) => [
    state.timetable,
    state.appointments.booking.bookingAppointment,
  ]);

  let today;

  if (service?.isAfterUpdate && update?.date) {
    today = dayjs(update.date).tz(timezone).utc(true).subtract(1, 'day');
  } else {
    today = getToday(timezone);
  }

  const [startDay, setStartDay] = useState(today.weekday(0));

  return [{ today, startDay }, setStartDay];
};

export default useStartDay;
