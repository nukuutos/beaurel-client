import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const useUpdateDate = () => {
  const { services } = useSelector((state) => state.services);

  let indexes = { service: null, subService: null };

  services.some((service, serviceIndex) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      return service.subServices.some((subService, subServiceIndex) => {
        if (subService.update && subService.update.date) {
          indexes = { service: serviceIndex, subService: subServiceIndex };
          return true;
        }
        return false;
      });
    }

    if (service.update && service.update.date) {
      indexes.service = serviceIndex;
      return true;
    }

    return false;
  });

  const { service: serviceIndex, subService: subServiceIndex } = indexes;

  let updateDate;

  const isSubServiceIndex = subServiceIndex || subServiceIndex === 0;

  if (isSubServiceIndex) {
    updateDate = services[serviceIndex].subServices[subServiceIndex].update.date;
  } else {
    updateDate = services[serviceIndex].update.date;
  }

  return dayjs(updateDate).utc(true).format('DD.MM.YY');
};

export default useUpdateDate;
