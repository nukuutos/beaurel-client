import cloneDeep from 'lodash.clonedeep';

const deleteProperties = (object, propertyArray) => {
  const copiedObject = { ...object };
  propertyArray.forEach((property) => delete copiedObject[property]);
  return copiedObject;
};

const getIdsAndOrders = (services) => {
  const copiedServices = [...cloneDeep(services)];
  const idsAndOrders = [];

  for (let service of copiedServices) {
    if (service.subServices) {
      service.subServices.forEach((subService) => {
        subService = deleteProperties(subService, ['parameter', 'price', 'duration', 'update']);
        subService.order = service.order;
        idsAndOrders.push(subService);
      });
    } else {
      service = deleteProperties(service, ['title', 'price', 'duration', 'update']);
      idsAndOrders.push(service);
    }
  }
  return idsAndOrders;
};

export default getIdsAndOrders;
