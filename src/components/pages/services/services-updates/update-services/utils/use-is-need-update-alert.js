import { useSelector } from 'react-redux';

const useIsUpdateAlert = () => {
  const { services } = useSelector((state) => state.services);

  if (!services.length) return false;

  const isAlert = services.some((service) => {
    const isParameterService = service.subServices;

    if (isParameterService) {
      const isNeedUpdate = service.subServices.some(
        (subService) => subService?.update?.status === 'unsuitable'
      );

      return isNeedUpdate;
    }

    return service?.update?.status === 'unsuitable';
  });

  return isAlert;
};

export default useIsUpdateAlert;
