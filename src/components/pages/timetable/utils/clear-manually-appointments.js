const clearManuallyAppointments = () => {
  const clearedManuallyAppointments = {};

  for (let i = 0; i < 7; i++) {
    clearedManuallyAppointments[i] = [];
  }

  return clearedManuallyAppointments;
};

export default clearManuallyAppointments;
