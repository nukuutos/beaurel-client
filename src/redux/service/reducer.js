import {
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  GET_SERVICES_START,
  SET_SERVICES,
  REODER_SERVICES,
  REODER_SUB_SERVICES,
  SET_INITIAL_ORDER,
} from './types';
import getIdsAndOrders from '../../components/profile/section-cards/services/utils/get-ids-and-orders';

const INITIAL_STATE = { isLoading: false, services: [], initialOrder: null };

const serviceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_START:
      return { ...state, isLoading: true };

    case GET_SERVICES_SUCCESS:
    case SET_SERVICES:
      const { services } = payload;
      return { ...state, isLoading: false, services, initialOrder: getIdsAndOrders(services) };

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
        const copyServices = [...state.services];

        const parentIndex = copyServices.findIndex((service) => service.title === title); // find service

        const parentService = copyServices[parentIndex];
        const mappedSubServices = parentService.subServices.map((service) => {
          if (service.id === updatedService.id) return { id, ...restServiceProps };
          return service;
        }); // change subService
        const mappedParentService = { ...parentService, subServices: mappedSubServices }; // change whole sub services of service parameter

        // by order we can replace parameter service in array
        copyServices[mappedParentService.order] = mappedParentService;

        return { ...state, services: copyServices };
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

    case REODER_SERVICES:
      const { source, destination } = payload;

      if (!destination) return state;

      let copiedServices = [...state.services];
      const [removedService] = copiedServices.splice(source.index, 1);
      copiedServices.splice(destination.index, 0, removedService);
      copiedServices = copiedServices.map((service, index) => {
        service.order = index;
        return service;
      });

      return { ...state, services: copiedServices };

    case REODER_SUB_SERVICES:
      // const { source, destination } = payload;

      if (!payload.destination) return state;
      // copy state of services
      const copiedServicesR = [...state.services];
      // find parameter service
      const parentIndexR = copiedServicesR.findIndex((service) => service.title === payload.title); // find service
      const parentServiceR = copiedServicesR[parentIndexR];
      // copy sub-services of parameter service
      let copiedSubServices = [...parentServiceR.subServices];
      // remove needing sub service
      const [removedSubService] = copiedSubServices.splice(payload.source.index, 1);
      // insert to destination
      copiedSubServices.splice(payload.destination.index, 0, removedSubService);
      // change sub-orders of sub-services
      copiedSubServices = copiedSubServices.map((service, index) => {
        service.subOrder = index;
        return service;
      });
      // change sub-services in parameter service
      parentServiceR.subServices = copiedSubServices;
      // replace service in services
      copiedServicesR[parentIndexR] = parentServiceR;

      // return
      return { ...state, services: copiedServicesR };

    case SET_INITIAL_ORDER:
      // const { newOrder } = payload;
      // console.log(payload);

      return { ...state, initialOrder: payload };

    default:
      return state;
  }
};

export default serviceReducer;
