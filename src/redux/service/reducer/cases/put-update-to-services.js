import { cloneDeep } from 'lodash';

const putUpdateToServices = (state, payload) => {
  const { services } = payload;

  const copiedServices = cloneDeep(state.services);

  // {id and duration}
  services.forEach(({ id, duration }) => {
    let indexes = { service: -1, subService: -1 };

    let serviceIndex = copiedServices.findIndex((service) => service.id === id);

    if (serviceIndex !== -1) indexes.service = serviceIndex;
    else {
      serviceIndex = copiedServices.some((service, serviceIndex) => {
        if (!service.subServices) return false;

        const isFound = service.subServices.some((subService, subServiceIndex) => {
          if (subService.id !== id) return false;
          indexes = { service: serviceIndex, subService: subServiceIndex };
          return true;
        });

        return isFound;
      });
    }

    if (indexes.subService !== -1) {
      // parameter service
      const service = copiedServices[indexes.service].subServices[indexes.subService];
      service.update.status = 'suitable';
      service.update.duration = duration;
    } else {
      const service = copiedServices[indexes.service];
      service.update.status = 'suitable';
      service.update.duration = duration;
    }
  });

  return { ...state, services: copiedServices };
};

export default putUpdateToServices;
