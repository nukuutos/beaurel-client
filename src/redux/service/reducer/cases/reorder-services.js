import { cloneDeep } from 'lodash';

const reorderServices = (state, payload) => {
  const { source, destination } = payload;

  if (!destination) return state;

  const services = cloneDeep(state.services);
  const [removedService] = services.splice(source.index, 1);

  services.splice(destination.index, 0, removedService);

  const reorderedServices = services.map((service, index) => {
    service.order = index;
    return service;
  });

  return {
    ...state,
    services: reorderedServices,
  };
};

export default reorderServices;
