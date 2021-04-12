import {
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  REODER_SERVICES,
  REODER_SUB_SERVICES,
  SET_INITIAL_ORDER,
} from './types/service';

import {
  ADD_SERVICE_PARAMETER_SUCCESS,
  UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  UPDATE_SUB_SERVICE_SUCCESS,
  DELETE_SUB_SERVICE_SUCCESS,
  DELETE_SERVICE_PARAMETER_SUCCESS,
} from './types/service-parameter';

import getIdsAndOrders from '../../components/profile/section-cards/services/utils/get-ids-and-orders';

const INITIAL_STATE = { masterId: null, services: [], initialOrder: null };

// how to separete two reducers with one state?
// a lot of repeated vars, declare here let?
const serviceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_SUCCESS: {
      const { masterId, services } = payload;
      return { ...state, masterId: masterId || null, services, initialOrder: getIdsAndOrders(services) };
    }

    // ADD_SERVICE
    case ADD_SERVICE_SUCCESS: {
      // ordinary service, parameter service
      const { service } = payload;
      const { id, ...serviceProps } = service; // ids can be one or many
      // ordinary service
      return { ...state, services: [...state.services, { ...serviceProps, id }] };
    } // ...state убрать?

    case ADD_SERVICE_PARAMETER_SUCCESS: {
      const { serviceParameter, ids } = payload;
      const { subServices, title } = serviceParameter;

      const subServicesWithIds = subServices.map((subService, i) => ({ id: ids[i], ...subService }));
      const addedParameterService = { title, subServices: subServicesWithIds };
      return { ...state, services: [...state.services, addedParameterService] };
    }

    // UPDATE_SERVICE
    case UPDATE_SERVICE_SUCCESS: {
      const { updatedService } = payload;

      const updatedServices = state.services.map((service) => {
        if (service.id && service.id === updatedService.id) return updatedService;
        return service;
      });

      return { ...state, services: updatedServices };
    }

    case UPDATE_SUB_SERVICE_SUCCESS: {
      const { updatedSubService } = payload;

      const { ...restSubServiceProps } = updatedSubService; // title for find service parameter(wrapper of sub services)

      const parentIndex = state.services.findIndex((service) => service.title === updatedSubService.title); // find service parameter

      const parentService = { ...state.services[parentIndex] };
      // change subService
      const mappedSubServices = parentService.subServices.map((service) => {
        if (service.id === updatedSubService.id) return { id: updatedSubService.id, ...restSubServiceProps };
        return service;
      });
      // change whole sub services of service parameter
      const updatedServiceParameter = { ...parentService, subServices: mappedSubServices };

      // by order we can replace parameter service in array
      const copiedUpdatedServices = [...state.services];
      copiedUpdatedServices[updatedServiceParameter.order] = updatedServiceParameter;

      return { ...state, services: copiedUpdatedServices };
    }

    case UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS: {
      const { updatedServiceTitles } = payload;

      const updatedServicesWithServiceParameter = state.services.map((service) => {
        if (service.title === updatedServiceTitles.oldTitle) return { ...service, title: updatedServiceTitles.title };
        return service;
      });

      return { ...state, services: updatedServicesWithServiceParameter };
    }

    // DELETE_SERVICE
    case DELETE_SERVICE_SUCCESS: {
      // serviceType: service, subService, parameter (service with sub services)
      // deletedService (corresponding to types): {id}, {id, parentId}, {title}

      const { deletedService } = payload;

      // to switch? switch in switch? heze
      const newServices = state.services.filter((service) => service.id !== deletedService.id);
      return { ...state, services: newServices };
    }

    case DELETE_SUB_SERVICE_SUCCESS: {
      const { deletedSubService } = payload;

      const parentIndexN = state.services.findIndex((service) => service.title === deletedSubService.title); // find service

      const parentServiceN = state.services[parentIndexN];
      const filteredSubServices = parentServiceN.subServices.filter((service) => service.id !== deletedSubService.id); // delete subService
      const filteredParentService = { ...parentServiceN, subServices: filteredSubServices };

      const filteredState = state.services.filter((service) => service.title !== deletedSubService.title); // delete old service (parent)

      return filteredParentService.subServices.length !== 0
        ? { ...state, services: [...filteredState, filteredParentService] }
        : { ...state, services: filteredState };
    }

    case DELETE_SERVICE_PARAMETER_SUCCESS: {
      const { deletedServiceParameter } = payload;

      const newServicesD = state.services.filter((service) => deletedServiceParameter.title !== service.title);
      return { ...state, services: newServicesD };
    }

    // REODER
    case REODER_SERVICES: {
      const { source, destination } = payload;

      if (!destination) return state;

      const copiedServicesReoder = [...state.services];
      const [removedService] = copiedServicesReoder.splice(source.index, 1);

      copiedServicesReoder.splice(destination.index, 0, removedService);

      return {
        ...state,
        services: copiedServicesReoder.map((service, index) => {
          service.order = index;
          return service;
        }),
      };
    }

    case REODER_SUB_SERVICES: {
      if (!payload.destination) return state;
      // copy state of services
      const copiedServicesR = [...state.services];
      // find parameter service
      const parentIndexR = state.services.findIndex((service) => service.title === payload.title); // find service
      const parentServiceR = state.services[parentIndexR];
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
    }

    case SET_INITIAL_ORDER: {
      return { ...state, initialOrder: payload };
    }

    default:
      return state;
  }
};

export default serviceReducer;
