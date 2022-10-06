import reorderServices from '../utils/reorder-services';
import reorderSubServices from '../utils/reorder-sub-services';

const deleteSubService = (state, payload) => {
  const { id, title } = payload;

  const copiedServices = [...state.services];

  const parentIndex = copiedServices.findIndex((service) => service.title === title); // find service

  const parentService = { ...copiedServices[parentIndex] };
  const filteredSubServices = parentService.subServices.filter((service) => service.id !== id); // delete subService

  if (filteredSubServices.length === 0) {
    const filteredServices = copiedServices.filter((service) => service.title !== title); // delete old service (parent)
    const reorderedServices = reorderServices(filteredServices);
    return { ...state, services: reorderedServices };
  }

  const reorderedSubServices = reorderSubServices(filteredSubServices);
  const updatedParentService = { ...parentService, subServices: reorderedSubServices };

  copiedServices[parentIndex] = updatedParentService;

  return { ...state, services: copiedServices };
};

export default deleteSubService;
