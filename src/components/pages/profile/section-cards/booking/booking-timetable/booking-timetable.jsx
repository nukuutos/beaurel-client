import React from 'react';
import { useSelector } from 'react-redux';
import BookingTimetableDesktop from './booking-timetable-desktop/booking-timetable-desktop';
import BookingTimetablePhone from './booking-timetable-phone/booking-timetable-phone';

const BookingTimetable = ({ ...props }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? <BookingTimetablePhone {...props} /> : <BookingTimetableDesktop {...props} />;
};

export default BookingTimetable;
