const isDisabledServiceWithAutoTimetable = (bookingAppointment, service, timetable) => {
  const { time: startAt, availableAppointments } = bookingAppointment;
  const { sessionTime } = timetable;
  const { duration, title } = service;

  const endAt = startAt + duration;
  for (let i = startAt; i < endAt; i += sessionTime) {
    if (!availableAppointments.includes(i)) return true;
  }

  return false;
};

const isDisabledServiceWithManuallyTimetable = (bookingAppointment, service) => {
  const { time: startAt, unavailableAppointments } = bookingAppointment;
  const { duration } = service;

  const endAt = startAt + duration;
  const unavailableAppointmentsLength = unavailableAppointments.length;

  if (!unavailableAppointmentsLength) return false;

  for (let i = 0; i < unavailableAppointments.length; i++) {
    const unavailableTime = unavailableAppointments[i];
    if (endAt <= unavailableTime) return false;
    if (startAt <= unavailableTime && unavailableTime < endAt) return true;
  }

  return false;
};

const getIsDisabled = (bookingAppointment, service, timetable) => {
  const { update } = timetable;
  const { time, date } = bookingAppointment;

  if (update && new Date(update.date).getTime() <= date.getTime()) timetable = update;

  const { type } = timetable;

  const disableMethod = type === 'auto' ? isDisabledServiceWithAutoTimetable : isDisabledServiceWithManuallyTimetable;

  return time ? disableMethod(bookingAppointment, service, timetable) : false;
};

export default getIsDisabled;
