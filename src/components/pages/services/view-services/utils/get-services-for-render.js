const getServicesForRender = (services) =>
  services.map((service) => {
    const copiedService = { ...service };

    const isServiceParameter = copiedService.subServices;

    if (isServiceParameter) {
      const { subServices } = copiedService;
      copiedService.subServices = subServices.map((subService) => {
        if (subService.update && subService.update.date) subService.duration = subService.update.duration;
        return subService;
      });
    } else {
      if (copiedService.update && copiedService.update.date) copiedService.duration = copiedService.update.duration;
    }

    return copiedService;
  });

export default getServicesForRender;
