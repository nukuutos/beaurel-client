const addServiceParameter = (state, payload) => {
  const { serviceParameter, ids } = payload;
  const { subServices, title } = serviceParameter;
  const order = state.services.length;

  const transformedSubServices = subServices.map((subService, i) => ({
    id: ids[i],
    subOrder: i,
    ...subService,
  }));

  const addedParameterService = { title, order, subServices: transformedSubServices };

  return { ...state, services: [...state.services, addedParameterService] };
};

export default addServiceParameter;
