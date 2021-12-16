import { cloneDeep } from 'lodash';

const reorderSubServices = (state, payload) => {
  const { source, destination, title } = payload;

  if (!destination) return state;
  // copy state of services
  const services = [...state.services];
  // find parameter service
  const parentIndex = services.findIndex((service) => service.title === title); // find service
  const parentService = cloneDeep(services[parentIndex]);
  // remove needing sub service
  const [removedSubService] = parentService.subServices.splice(source.index, 1);
  // insert to destination
  parentService.subServices.splice(destination.index, 0, removedSubService);
  // change sub-orders of sub-services
  const reorderedSubServices = parentService.subServices.map((service, index) => {
    service.subOrder = index;
    return service;
  });
  // change sub-services in parameter service
  parentService.subServices = reorderedSubServices;
  // replace service in services
  services[parentIndex] = parentService;

  return { ...state, services };
};

export default reorderSubServices;
