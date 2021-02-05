import React from 'react';
import displayDuration from '../../services/utils/display-duration';

// return time like 10:00 and value in minutes 600
const generatePossibleAppointmentsTime = (workingDay, sessionTime) => {
  const { startAt, endAt } = workingDay;

  const possibleAppointmentsTime = [];

  for (let i = startAt; i < endAt; i += sessionTime) {
    possibleAppointmentsTime.push({ time: displayDuration(i), value: i });
  }

  return possibleAppointmentsTime;
};

export default generatePossibleAppointmentsTime;
