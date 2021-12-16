const updateService = (state, payload) => {
  const { updatedService } = payload;

  const updatedServices = state.services.map((service) => {
    if (service.id === updatedService.id) return updatedService;
    return service;
  });

  return { ...state, services: updatedServices };
};

export default updateService;
