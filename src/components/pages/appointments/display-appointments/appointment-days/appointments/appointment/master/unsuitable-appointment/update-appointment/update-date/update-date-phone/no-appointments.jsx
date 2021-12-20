import React from 'react';

const NoAppointments = ({ toNextWeek }) => (
  <div className="booking-timetable__no-appointments">
    На этой неделе нет свободных записей!
    <button type="button" onClick={toNextWeek} className="btn-text">
      следующая неделя
    </button>
  </div>
);

export default NoAppointments;
