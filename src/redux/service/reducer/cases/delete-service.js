import reorderServices from '../../utils/reorder-services';

const deleteService = (state, payload) => {
  const { serviceId } = payload;
  const filteredServices = state.services.filter((service) => service.id !== serviceId);
  const reorderedServices = reorderServices(filteredServices);
  return { ...state, services: reorderedServices };
};

export default deleteService;
