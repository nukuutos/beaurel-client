import React from 'react';
import weekdaysRU from '../../../utils/weekdays-ru';

const getWeekendsString = (weekends) => {
  if (!weekends.length) return '-';
  return weekends.map((weekdayNum) => weekdaysRU[weekdayNum]).join(' ');
};

const DisplayWeekends = ({ values }) => {
  const { weekends } = values.auto;
  const stringWeekends = getWeekendsString(weekends);
  return (
    <>
      <span className="timetable-card__label  mt-5">Выхоные:</span>
      <span className="timetable-card__value ml-1 mt-5">{stringWeekends}</span>
    </>
  );
};

export default DisplayWeekends;
