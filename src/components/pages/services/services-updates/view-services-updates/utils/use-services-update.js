import { useSelector } from 'react-redux';

const useServicesUpdate = () => {
  const { services } = useSelector((state) => state.services);

  const updatedServices = services.map((service) => {
    const copiedService = { ...service };

    const isServiceParameter = copiedService.subServices;

    if (isServiceParameter) {
      const { subServices } = copiedService;

      copiedService.subServices = subServices.map((subService) => {
        const updatedSubService = { ...subService };

        if (updatedSubService.update?.date) {
          updatedSubService.duration = updatedSubService.update.duration;
        }

        return updatedSubService;
      });
    } else if (copiedService.update?.date) {
      copiedService.duration = copiedService.update.duration;
    }

    return copiedService;
  });

  return updatedServices;
};

export default useServicesUpdate;
