import reorderServices from '../utils/reorder-services';

const deleteServiceParameter = (state, payload) => {
  const { title } = payload;

  const filteredServices = state.services.filter((service) => title !== service.title);
  const reorderedServices = reorderServices(filteredServices);

  return { ...state, services: reorderedServices };
};

export default deleteServiceParameter;
