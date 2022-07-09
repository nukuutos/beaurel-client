import { useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';

const useServicesForUpdate = () => {
  const { services } = useSelector((state) => state.services);

  const copiedServices = [...cloneDeep(services)];

  const filteredServices = copiedServices
    .map((service) => {
      const isServiceParameter = service.subServices;

      if (isServiceParameter) {
        const filteredSubServices = service.subServices.filter(
          (subService) => subService.update?.status === 'unsuitable'
        );

        if (filteredSubServices.length === 0) return null;
        return { ...service, subServices: filteredSubServices };
      }

      if (service.update?.status === 'unsuitable') return service;
      return null;
    })
    .filter((service) => service !== null);

  return filteredServices;
};

export default useServicesForUpdate;
