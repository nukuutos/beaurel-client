import React from 'react';
import displayExceptions from '../../utils/display-times';

const Exceptions = ({ values }) => {
  const { exceptions } = values.auto;

  const exceptionsToShow = displayExceptions(exceptions);
  const isExceptions = exceptionsToShow.length;

  return (
    <>
      <span className="timetable-card__label mt-5">Исключения:</span>
      <span className="timetable-card__value timetable-card__exceptions ml-1 mt-5">
        {isExceptions ? exceptionsToShow : '-'}
      </span>

      <span className="timetable-card__tip timetable-card__tip--gray mt-1">
        Нажмите на время в расписании, чтобы исключить его
      </span>
    </>
  );
};

export default Exceptions;
