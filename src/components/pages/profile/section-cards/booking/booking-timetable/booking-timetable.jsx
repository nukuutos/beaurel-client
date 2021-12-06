import React from 'react';
import useMediaQuery from '../../../../../../hooks/use-media-query';
import BookingTimetableDesktop from './booking-timetable-desktop/booking-timetable-desktop';
import BookingTimetablePhone from './booking-timetable-phone/booking-timetable-phone';

const BookingTimetable = ({ ...props }) => {
  const isPhone = useMediaQuery(600);

  return isPhone ? <BookingTimetablePhone {...props} /> : <BookingTimetableDesktop {...props} />;
};

export default BookingTimetable;
