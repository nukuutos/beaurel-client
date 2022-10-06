const updateSubService = (state, payload) => {
  const { updatedSubService } = payload;

  const { title, ...restSubServiceProps } = updatedSubService; // title for find service parameter(wrapper of sub services)

  const copiedServices = [...state.services];

  const parentIndex = copiedServices.findIndex((service) => service.title === title); // find service parameter
  const parentService = { ...copiedServices[parentIndex] };

  // change subService
  const updatedSubServices = parentService.subServices.map((service) => {
    if (service.id !== updatedSubService.id) return service;
    return { id: service.id, ...restSubServiceProps };
  });

  // change whole sub services of service parameter
  const updatedServiceParameter = { ...parentService, subServices: updatedSubServices };

  // by order we can replace parameter service in array

  const { order } = updatedServiceParameter;
  copiedServices[order] = updatedServiceParameter;

  return { ...state, services: copiedServices };
};

export default updateSubService;
