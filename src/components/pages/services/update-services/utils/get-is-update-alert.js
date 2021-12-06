const getIsUpdateAlert = (services) => {
  if (!services.length) return false;

  return services.some((service) => {
    const isParameterService = service.subServices;

    if (isParameterService) {
      const isNeedUpdate = service.subServices.some((subService) => {
        return subService.update && subService.update.date && subService.update.status === 'unsuitable';
      });

      return isNeedUpdate;
    }

    return service.update && service.update.date && service.update.status === 'unsuitable';
  });
};

export default getIsUpdateAlert;
