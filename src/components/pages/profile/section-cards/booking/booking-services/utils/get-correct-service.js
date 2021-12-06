const serviceIsFirstStep = (service, isAfterUpdate) => {
  if (isAfterUpdate) {
    const newService = { ...service };
    newService.duration = newService.update.duration;
    return newService;
  }

  return service;
};

const timetableIsFirstStep = (service, today) => {
  const { update } = service;
  if (!update) return service;

  const { date: updateDate } = update;

  if (today.isSameOrAfter(updateDate) && update.status === 'suitable') {
    const newService = { ...service };
    newService.duration = newService.update.duration;
    return newService;
  }

  return service;
};

// today must be without offset!!
const getCorrectService = ({ step, service, today = null, isAfterUpdate = false }) => {
  if (step === 2) return timetableIsFirstStep(service, today);
  return serviceIsFirstStep(service, isAfterUpdate);
};

export default getCorrectService;
