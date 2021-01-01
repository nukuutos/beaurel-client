const disable = (startAt, availableAppointments, sessionTime, duration) => {
  const endAt = startAt + duration;
  for (let i = startAt; i < endAt; i += sessionTime) {
    if (!availableAppointments.includes(i)) return true;
  }

  return false;
};

export default disable;
