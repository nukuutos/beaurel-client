import dayjs from 'dayjs';

const isDisabledServiceWithAutoTimetable = (bookingAppointment, service, timetable) => {
  const { time: startAt, availableAppointments } = bookingAppointment;
  const { sessionTime } = timetable;
  const { duration } = service;

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

const getIsServiceUnsuitable = (service, today) => {
  today = today || dayjs().startOf('day').utc(true);

  const { update } = service;
  if (!update || !update.date || !today) return false;

  const updateDate = dayjs(update.date).utc(true);

  if (updateDate.isSameOrBefore(today) && update.status === 'unsuitable') return true;
  return false;
};

// correct service is service that has valid duration on top level of object
const getIsDisabled = (bookingAppointment, correctService, timetable) => {
  const { time, date } = bookingAppointment;

  const isServiceUnsuitable = getIsServiceUnsuitable(correctService, date);
  if (isServiceUnsuitable) return true;

  if (!time) return false;

  const { update } = timetable;

  const updateDate = dayjs(update.date).utc(true);

  if (update?.date && updateDate.isSameOrBefore(date)) {
    timetable = update;
  }

  const { type } = timetable;

  const timetableDisableMethod =
    type === 'auto' ? isDisabledServiceWithAutoTimetable : isDisabledServiceWithManuallyTimetable;

  return timetableDisableMethod(bookingAppointment, correctService, timetable);
};

export default getIsDisabled;
