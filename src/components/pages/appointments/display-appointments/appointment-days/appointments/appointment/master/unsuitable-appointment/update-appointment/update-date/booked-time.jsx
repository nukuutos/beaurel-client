import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BookedTime = () => (
  <div className="booking-timetable__booked-time booked-time">
    <div className="booked-time__group">
      <FontAwesomeIcon icon="calendar" />
      <span>12.01.2021</span>
    </div>
    <div className="booked-time__group">
      <FontAwesomeIcon icon="clock" />
      <span>12:00 - 13:00</span>
    </div>
  </div>
);

export default BookedTime;
