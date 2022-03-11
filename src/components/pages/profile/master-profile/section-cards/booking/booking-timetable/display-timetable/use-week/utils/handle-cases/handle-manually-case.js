import ManuallyTimetable from '../../timetables/manually-timetable';

const handleManuallyCase = ({ date, timetable, addEmptyDay, dataForBooking }) => {
  const { bookedAppointments, service } = dataForBooking;

  const weekdayIndex = date.weekday();

  const { sessionTime, manually } = timetable;

  const availableAppointmentsForWeekday = manually.appointments[weekdayIndex];

  if (!availableAppointmentsForWeekday.length) {
    return addEmptyDay();
  }

  const manuallyTimetable = new ManuallyTimetable(sessionTime, availableAppointmentsForWeekday);

  manuallyTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);

  if (service) manuallyTimetable.filterAppointmentsWithService(service);

  const appointments = manuallyTimetable.getAppointments();

  return { isContinue: false, appointments };
};

export default handleManuallyCase;
