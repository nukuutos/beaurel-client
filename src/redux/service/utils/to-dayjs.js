import dayjs from 'dayjs';

const transformDate = (service) => {
  const isUpdate = service?.update?.date;
  if (!isUpdate) return service;
  const { date } = service.update;
  service.update.date = dayjs(date).utc(true);
  return service;
};

const toDayjs = (services) =>
  services.map((service) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      const transformedSubServices = service.subServices.map((subService) =>
        transformDate(subService)
      );
      service.subServices = transformedSubServices;
    }

    return transformDate(service);
  });

export default toDayjs;
