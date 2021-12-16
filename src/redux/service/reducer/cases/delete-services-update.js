const deleteServicesUpdate = (state, payload) => {
  const services = state.services.map((service) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      const subServices = service.subServices.map((subService) => {
        if (subService?.update?.date) subService.update = null;
        return subService;
      });

      service.subServices = subServices;

      return service;
    }

    if (service?.update?.date) service.update = null;

    return service;
  });

  return { ...state, services };
};

export default deleteServicesUpdate;
