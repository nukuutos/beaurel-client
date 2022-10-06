// mutate object!
const reorderServices = (services) => {
  for (let i = 0; i < services.length; i++) {
    const currentService = services[i];
    currentService.order = i;
  }

  return services;
};

export default reorderServices;
