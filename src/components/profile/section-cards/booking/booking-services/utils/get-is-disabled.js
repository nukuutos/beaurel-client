import { getUpdateDate, toDayjs } from "../../booking-timetable/booking-phone-timetable/utils";

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

const getIsServiceUnsuitable = (service, today = null) => {
  const { update } = service;
  if (!update || !update.date || !today) return false;

  const updateDate = getUpdateDate(update); // utc

  if (updateDate.isBefore(today) && update.status === "unsuitable") return true;

  return false;
};

const getIsDisabled = (bookingAppointment, service, timetable) => {
  let { time, date } = bookingAppointment;

  if (!time) return false;

  date = toDayjs(date);

  const isServiceUnsuitable = getIsServiceUnsuitable(service, date);
  if (isServiceUnsuitable) return true;

  const { update } = timetable;

  const updateDate = getUpdateDate(update); // utc

  if (updateDate && !updateDate.isAfter(date)) timetable = update;

  const { type } = timetable;

  const timetableDisableMethod =
    type === "auto" ? isDisabledServiceWithAutoTimetable : isDisabledServiceWithManuallyTimetable;

  return timetableDisableMethod(bookingAppointment, service, timetable);
};

export default getIsDisabled;
