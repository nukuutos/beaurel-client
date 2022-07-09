import React from 'react';

const AutoTimetableWeekday = ({ children, weekdayName }) => (
  <div className="timetable-visual__weekday weekday">
    <div className="weekday__name">{weekdayName}</div>
    <div className="weekday__appointments">{children}</div>
  </div>
);

export default AutoTimetableWeekday;
