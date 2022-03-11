import React from 'react';
import { useSelector } from 'react-redux';
import DisplayTimetable from './display-timetable/display-timetable';
import NoTimetable from './no-timetable/no-timetable';
import useGetDataForBooking from './use-get-data-for-booking';

const BookingTimetable = ({ ...props }) => {
  const { sessionTime, isServices } = useSelector((state) => state.timetable);
  const isLoading = useGetDataForBooking(); // initial load
  const ableToBooking = sessionTime && isServices;

  return isLoading || ableToBooking ? (
    <DisplayTimetable isLoading={isLoading} {...props} />
  ) : (
    <NoTimetable {...props} />
  );
};

export default BookingTimetable;
