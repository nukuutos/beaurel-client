exports.getAvailableAppointmentsTime = (bookedAppointments, possibleAppointmentsTime, sessionTime) => {
  const availableAppointmentsTime = [...possibleAppointmentsTime];
  const bookedAppointmentsCount = bookedAppointments.length;

  for (let i = 0; i < bookedAppointmentsCount; i++) {
    const bookedTime = bookedAppointments[i];
    const { startAt, endAt } = bookedTime;

    const startIndex = availableAppointmentsTime.indexOf(startAt);
    const deleteCount = (endAt - startAt) / sessionTime;
    availableAppointmentsTime.splice(startIndex, deleteCount);
  }

  return availableAppointmentsTime;
};
