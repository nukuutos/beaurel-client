exports.searchFreeAppointmentsTime = (bookedAppointments, possibleAppointmentsTime, sessionTime) => {
  const freeAppointmentsTime = [...possibleAppointmentsTime];
  const bookedAppointmentsCount = bookedAppointments.length;

  for (let i = 0; i < bookedAppointmentsCount; i++) {
    const bookedTime = bookedAppointments[i];
    const { startAt, endAt } = bookedTime;

    const startIndex = freeAppointmentsTime.indexOf(startAt);
    const deleteCount = (endAt - startAt) / sessionTime;
    freeAppointmentsTime.splice(startIndex, deleteCount);
  }

  return freeAppointmentsTime;
};
