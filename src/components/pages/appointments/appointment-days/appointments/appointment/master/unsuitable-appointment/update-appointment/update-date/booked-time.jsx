import dayjs from 'dayjs';
import React from 'react';
import Calendar from '../../../../../../../../../base/icons/calendar';
import Time from '../../../../../../../../../base/icons/time.';
import displayDuration from '../../../../../../../../utils/display-duration';

const BookedTime = ({ appointment }) => {
  const { date, time } = appointment;
  const { startAt, endAt } = time;

  const appointmentDuration = `${displayDuration(startAt)} - ${displayDuration(endAt)}`;
  const formattedDate = dayjs(date).format('DD.MM.YYYY');

  return (
    <div className="booking-timetable__booked-time booked-time">
      <div className="booked-time__group">
        <Calendar />
        <span>{formattedDate}</span>
      </div>
      <div className="booked-time__group">
        <Time />
        <span>{appointmentDuration}</span>
      </div>
    </div>
  );
};

export default BookedTime;
