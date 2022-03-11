import AutoTimetable from '../../timetables/auto-timetable';

const handleAutoCase = ({ date, timetable, dataForBooking, addEmptyDay }) => {
  const { bookedAppointments, service } = dataForBooking;

  const { sessionTime, auto } = timetable;

  const { weekends, possibleAppointmentsTime, exceptions } = auto;

  const autoTimetable = new AutoTimetable(
    sessionTime,
    possibleAppointmentsTime,
    weekends,
    exceptions
  );

  const weekdayIndex = date.weekday();

  const isWeekend = autoTimetable.checkWeekend(weekdayIndex);

  if (isWeekend) return addEmptyDay();

  autoTimetable
    .filterAppointmentsWithBookedAppointments(bookedAppointments)
    .filterAppointmentsWithExceptions(weekdayIndex);

  if (service) autoTimetable.filterAppointmentsWithService(service);

  const appointments = autoTimetable.getAppointments();

  return { isContinue: false, appointments };
};

export default handleAutoCase;
