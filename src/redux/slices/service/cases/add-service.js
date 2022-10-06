const addService = (state, payload) => {
  const { service } = payload;
  service.order = state.services.length;
  service.subOrder = null;
  return { ...state, services: [...state.services, service] };
};

export default addService;
