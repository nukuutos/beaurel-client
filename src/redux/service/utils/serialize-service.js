import dayjs from 'dayjs';

const transform = (service) => {
  service.duration = Number(service.duration);
  const isUpdate = service?.update?.date;
  if (!isUpdate) return service;

  service.update.duration = Number(service.update.duration);
  // const { date } = service.update;
  // service.update.date = dayjs(date).utc(true);

  return service;
};

const serializeService = (services) =>
  services.map((service) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      const transformedSubServices = service.subServices.map((subService) => transform(subService));
      service.subServices = transformedSubServices;
    }

    return transform(service);
  });

export default serializeService;
