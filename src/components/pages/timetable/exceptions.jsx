import React from 'react';
import displayExceptions from './utils/display-exceptions';

const Exceptions = ({ exceptions }) => {
  const exceptionsArray = displayExceptions(exceptions);

  return (
    <>
      <label className="timetable-card__label  mt-5">Исключения:</label>
      <span className="timetable-card__value timetable-card__exceptions ml-1 mt-5">
        {exceptionsArray.length ? exceptionsArray : '-'}
      </span>

      <span className="timetable-card__tip timetable-card__tip--gray mt-1">
        Нажмите на время в расписании, чтобы исключить его
      </span>
    </>
  );
};

export default Exceptions;
