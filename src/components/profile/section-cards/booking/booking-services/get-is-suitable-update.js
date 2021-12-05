const getIsSuitableUpdate = (services) => {
  if (!services.length) return false;

  let hasUpdate;

  const isSuitable = services.every((service) => {
    const isParameterService = service.subServices;

    if (isParameterService) {
      const isSuitable = service.subServices.some((subService) => {
        if (!subService.update) return true;

        if (subService.update.status === 'suitable') {
          hasUpdate = true;
          return true;
        }

        return false;
      });

      return isSuitable;
    }

    if (!service.update) return true;

    if (service.update.status === 'suitable') {
      hasUpdate = true;
      return true;
    }

    return false;
  });

  return hasUpdate && isSuitable;
};

export default getIsSuitableUpdate;
