import generateTimes from './generate-times';

const getPossibleAppointmentTimes = (values, index) => {
  const { sessionTime, auto } = values;
  const { weekends, workingDay } = auto;

  const isWeekend = weekends.includes(index);

  if (isWeekend) return [];

  const possibleAppointmentTimes = generateTimes(workingDay, sessionTime);

  return possibleAppointmentTimes;
};

export default getPossibleAppointmentTimes;
