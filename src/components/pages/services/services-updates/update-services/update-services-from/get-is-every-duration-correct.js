const getIsEveryServiceDurationCorrect = (services, sessionTime) =>
  services.every((service) => {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      const isSubServicesDurationCorrect = service.subServices.every(
        (subService) => subService.duration % sessionTime === 0
      );
      return isSubServicesDurationCorrect;
    }

    return service.duration % sessionTime === 0;
  });

export default getIsEveryServiceDurationCorrect;
