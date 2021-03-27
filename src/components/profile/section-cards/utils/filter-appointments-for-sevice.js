const filterAppointmentsForSevice = (time, duration, unavailableAppointments) => {
  const startAt = time;
  const endAt = startAt + duration;
  const unavailableAppointmentsLength = unavailableAppointments.length;

  if (!unavailableAppointmentsLength) return true;

  for (let i = 0; i < unavailableAppointments.length; i++) {
    const unavailableTime = unavailableAppointments[i];
    if (endAt <= unavailableTime) return true;
    if (startAt <= unavailableTime && unavailableTime < endAt) return false;
  }

  return true;
};

export default filterAppointmentsForSevice;
