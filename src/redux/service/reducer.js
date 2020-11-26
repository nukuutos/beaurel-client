import {
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  GET_SERVICES_START,
} from './types';

const INITIAL_STATE = { isLoading: false, services: [] };

const serviceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_START:
      return { ...state, isLoading: true };

    case GET_SERVICES_SUCCESS:
      const { services } = payload;
      return { ...state, isLoading: false, services };

    case ADD_SERVICE_SUCCESS: // ordinary service, parameter service
      const { service } = payload;
      const { ids, ...serviceProps } = service; // ids can be one or many
      // ordinary service
      if (typeof ids === 'string') return { ...state, services: [...state.services, { ...serviceProps, id: ids }] }; // ...state убрать?

      // parameter service(object)
      const { subServices, title } = service;
      const subServicesWithIds = subServices.map((subService, i) => ({ id: ids[i], ...subService }));
      const addedService = { title, subServices: subServicesWithIds };
      return { ...state, services: [...state.services, addedService] }; // ...state убрать?

    case UPDATE_SERVICE_SUCCESS:
      const { updatedServiceType, updatedService } = payload;

      if (updatedServiceType === 'service') {
        const newServices = state.services.map((service) => {
          if (service.id && service.id === updatedService.id) return updatedService;
          return service;
        });

        return { ...state, services: newServices };
      }

      if (updatedServiceType === 'sub-service') {
        const { title, id, ...restServiceProps } = updatedService; // title for find parent(wrapper of sub services)

        const parentIndex = state.services.findIndex((service) => service.title === title); // find service

        const parentService = state.services[parentIndex];
        const mappedSubServices = parentService.subServices.map((service) => {
          if (service.id === updatedService.id) return { id, ...restServiceProps };
          return service;
        }); // change subService
        const mappedParentService = { ...parentService, subServices: mappedSubServices }; // change whole sub services of service parameter

        const filteredState = state.services.filter((service) => service.title !== title); // delete old service (parent)

        return { ...state, services: [...filteredState, mappedParentService] };
      }

      if (updatedServiceType === 'parameter') {
        const { title, oldTitle } = updatedService;

        const newServices = state.services.map((service) => {
          if (service.title === oldTitle) return { ...service, title };
          return service;
        });

        return { ...state, services: newServices };
      }

    case DELETE_SERVICE_SUCCESS:
      // serviceType: service, subService, parameter (service with sub services)
      // deletedService (corresponding to types): {id}, {id, parentId}, {title}

      const { serviceType, deletedService } = payload;

      // to switch? switch in switch? heze
      if (serviceType === 'service') {
        console.log(deletedService);
        const newServices = state.services.filter((service) => service.id !== deletedService.id);
        return { ...state, services: newServices };
      }

      if (serviceType === 'sub-service') {
        const { title, id } = deletedService;

        const parentIndex = state.services.findIndex((service) => service.title === title); // find service

        const parentService = state.services[parentIndex];
        const filteredSubServices = parentService.subServices.filter((service) => service.id !== id); // delete subService
        const filteredParentService = { ...parentService, subServices: filteredSubServices };

        const filteredState = state.services.filter((service) => service.title !== title); // delete old service (parent)

        return filteredParentService.subServices.length !== 0
          ? { ...state, services: [...filteredState, filteredParentService] }
          : { ...state, services: filteredState };
      }

      if (serviceType === 'parameter') {
        const newServices = state.services.filter((service) => deletedService.title !== service.title);
        return { ...state, services: newServices };
      }

    default:
      return state;
  }
};

export default serviceReducer;
