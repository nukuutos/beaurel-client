import React from 'react';
import displayExceptions from './utils/display-exceptions';

const ManuallyAppointments = ({ appointments }) => {
  // rename exceptions
  const appointmentsArray = displayExceptions(appointments);

  return (
    <>
      <label className="timetable-card__label  mt-5">Время для записи:</label>
      <span className="timetable-card__value timetable-card__exceptions ml-1 mt-5">
        {appointmentsArray.length ? appointmentsArray : '-'}
      </span>

      <span className="timetable-card__tip timetable-card__tip--gray mt-1">
        Нажмите на время в расписании ниже, чтобы исключить его
      </span>
    </>
  );
};

export default ManuallyAppointments;
