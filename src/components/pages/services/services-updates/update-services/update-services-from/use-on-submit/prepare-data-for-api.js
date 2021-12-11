const prepareDataForApi = (services) => {
  const data = [];

  services.forEach((service) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      service.subServices.forEach(({ id, duration }) => data.push({ id, duration }));
    } else data.push({ id: service.id, duration: service.duration });
  });

  return data;
};

export default prepareDataForApi;
