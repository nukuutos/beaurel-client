import displayDuration from '../../services/utils/display-duration';

// return for example time 10:00 and value in minutes 600
const generatePossibleAppointmentsTime = (workingDay, sessionTime) => {
  sessionTime = Number(sessionTime);

  let { startAt, endAt } = workingDay;

  startAt = Number(startAt);
  endAt = Number(endAt);

  const possibleAppointmentsTime = [];

  for (let i = startAt; i <= endAt - sessionTime; i += sessionTime) {
    possibleAppointmentsTime.push({ time: displayDuration(i), value: i });
  }

  return possibleAppointmentsTime;
};

export default generatePossibleAppointmentsTime;
