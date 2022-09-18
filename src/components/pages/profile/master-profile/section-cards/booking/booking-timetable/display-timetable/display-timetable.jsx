import React from 'react';
import { useSelector } from 'react-redux';
import BookingTimetableDesktop from './booking-timetable-desktop/booking-timetable-desktop';
import BookingTimetablePhone from './booking-timetable-phone/booking-timetable-phone';

const DisplayTimetable = ({ state, getPickDate, ...props }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const { step } = state;

  return isPhone ? (
    <BookingTimetablePhone step={step} getHandleClickOnDay={getPickDate} {...props} />
  ) : (
    <BookingTimetableDesktop step={step} getHandleClickOnDay={getPickDate} {...props} />
  );
};

export default DisplayTimetable;
