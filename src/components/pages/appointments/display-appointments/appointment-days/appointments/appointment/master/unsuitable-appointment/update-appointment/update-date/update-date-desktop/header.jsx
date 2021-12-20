import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BookingTimetableHeader = ({ setDate }) => {
  const prevWeek = () => setDate((today) => today.weekday(-7));
  const nextWeek = () => setDate((today) => today.weekday(7));

  return (
    <div className="booking-timetable__header mb-7">
      <button type="button" onClick={prevWeek} className="booking-timetable__arrow btn-icon mr-6">
        <FontAwesomeIcon icon="chevron-left" />
      </button>
      <h2 className="heading booking-timetable__heading ">Выберите Время</h2>
      <button type="button" onClick={nextWeek} className="booking-timetable__arrow btn-icon ml-6">
        <FontAwesomeIcon icon="chevron-right" />
      </button>
    </div>
  );
};
export default BookingTimetableHeader;
