const servicesToUnsuitable = (state, payload) => {
  const { date, sessionTime } = payload;

  const services = state.services.map((service) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      const subServices = service.subServices.map((subService) => {
        if (subService.duration % sessionTime !== 0)
          subService.update = { date, status: 'unsuitable' };
        return subService;
      });

      service.subServices = subServices;
      return service;
    }

    if (service.duration % sessionTime !== 0) service.update = { date, status: 'unsuitable' };
    return service;
  });

  return { ...state, services };
};

export default servicesToUnsuitable;
