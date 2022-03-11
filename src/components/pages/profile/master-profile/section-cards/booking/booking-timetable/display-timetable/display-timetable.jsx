import React from 'react';
import { useSelector } from 'react-redux';
import useGetHandleClickOnDay from '../use-get-handle-click-on-day';
import BookingTimetableDesktop from './booking-timetable-desktop/booking-timetable-desktop';
import BookingTimetablePhone from './booking-timetable-phone/booking-timetable-phone';

const DisplayTimetable = ({ stepState, ...props }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [{ step }, setStep] = stepState;
  const getHandleClickOnDay = useGetHandleClickOnDay(setStep);

  return isPhone ? (
    <BookingTimetablePhone step={step} getHandleClickOnDay={getHandleClickOnDay} {...props} />
  ) : (
    <BookingTimetableDesktop step={step} getHandleClickOnDay={getHandleClickOnDay} {...props} />
  );
};

export default DisplayTimetable;
