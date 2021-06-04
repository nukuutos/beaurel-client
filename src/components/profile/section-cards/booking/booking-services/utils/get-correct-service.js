const getCorrectService = (service, today = null) => {
  const { update } = service;

  if (!update || !update.date || !today) return service;

  const updateDate = new Date(update.date);
  today = new Date(today);

  if (updateDate.getTime() >= today.getTime() && update.status === 'suitable') {
    const newService = { ...service };
    newService.duration = newService.update.duration;
    return newService;
  }

  return service;
};

export default getCorrectService;
