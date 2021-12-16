import React from 'react';
import displayAppointments from '../../utils/display-times';

const ManuallyAppointments = ({ values }) => {
  const { appointments } = values.manually;

  const appointmentsToDisplay = displayAppointments(appointments);
  const isAppointments = appointmentsToDisplay.length;

  return (
    <>
      <span className="timetable-card__label  mt-5">Время для записи:</span>
      <span className="timetable-card__value timetable-card__exceptions ml-1 mt-5">
        {isAppointments ? appointmentsToDisplay : '-'}
      </span>

      <span className="timetable-card__tip timetable-card__tip--gray mt-1">
        Нажмите на время в расписании ниже, чтобы исключить его
      </span>
    </>
  );
};

export default ManuallyAppointments;
