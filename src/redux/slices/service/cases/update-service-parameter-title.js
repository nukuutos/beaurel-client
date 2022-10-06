const updateServiceParameterTitle = (state, payload) => {
  const { title, oldTitle } = payload;

  const updatedServices = state.services.map((service) => {
    if (service.title === oldTitle) return { ...service, title };
    return service;
  });

  return { ...state, services: updatedServices };
};

export default updateServiceParameterTitle;
