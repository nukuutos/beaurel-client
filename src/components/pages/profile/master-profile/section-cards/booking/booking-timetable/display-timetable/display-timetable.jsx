import React from 'react';
import { useSelector } from 'react-redux';
import BookingTimetableDesktop from './booking-timetable-desktop/booking-timetable-desktop';
import BookingTimetablePhone from './booking-timetable-phone/booking-timetable-phone';

const DisplayTimetable = ({ state, getPickDate, ...props }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const { step, service } = state;

  return isPhone ? (
    <BookingTimetablePhone
      step={step}
      service={service}
      getHandleClickOnDay={getPickDate}
      {...props}
    />
  ) : (
    <BookingTimetableDesktop
      step={step}
      service={service}
      getHandleClickOnDay={getPickDate}
      {...props}
    />
  );
};

export default DisplayTimetable;
