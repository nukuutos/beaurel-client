import {
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  REODER_SERVICES,
  REODER_SUB_SERVICES,
  SET_INITIAL_ORDER,
  PUT_UPDATE_TO_SERVICES,
  SERVICES_TO_UNSUITABLE,
  DELETE_SERVICES_UPDATE,
} from './types/service';

import {
  ADD_SERVICE_PARAMETER_SUCCESS,
  UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  UPDATE_SUB_SERVICE_SUCCESS,
  DELETE_SUB_SERVICE_SUCCESS,
  DELETE_SERVICE_PARAMETER_SUCCESS,
} from './types/service-parameter';

import getIdsAndOrders from '../../components/profile/section-cards/services/utils/get-ids-and-orders';

const reoderServices = (services) => {
  const copiedServices = [...services];

  for (let i = 0; i < copiedServices.length; i++) {
    const currentService = copiedServices[i];
    currentService.order = i;
  }

  return copiedServices;
};

const reoderSubServices = (subServices) => {
  const copiedSubServices = [...subServices];

  for (let i = 0; i < copiedSubServices.length; i++) {
    const currentSubService = copiedSubServices[i];
    currentSubService.subOrder = i;
  }

  return copiedSubServices;
};

const INITIAL_STATE = { masterId: null, services: [], initialOrder: null };

// how to separete two reducers with one state?
// a lot of repeated vars, declare here let?
const serviceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_SUCCESS: {
      const { masterId, services } = payload;
      return {
        ...state,
        masterId: masterId || null,
        services,
        initialOrder: getIdsAndOrders(services),
      };
    }

    // ADD_SERVICE
    case ADD_SERVICE_SUCCESS: {
      const { service } = payload;

      service.order = state.services.length;
      service.subOrder = null;

      return { ...state, services: [...state.services, service] };
    }

    case ADD_SERVICE_PARAMETER_SUCCESS: {
      const { serviceParameter, ids } = payload;
      const { subServices, title } = serviceParameter;
      const order = state.services.length;

      const subServicesWithIds = subServices.map((subService, i) => ({
        id: ids[i],
        subOrder: i,
        ...subService,
      }));

      const addedParameterService = { title, order, subServices: subServicesWithIds };
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

      const { title, ...restSubServiceProps } = updatedSubService; // title for find service parameter(wrapper of sub services)

      const parentIndex = state.services.findIndex((service) => service.title === title); // find service parameter

      const parentService = { ...state.services[parentIndex] };

      // change subService
      const updatedSubServices = parentService.subServices.map((service) => {
        if (service.id === updatedSubService.id)
          return { id: updatedSubService.id, ...restSubServiceProps };
        return service;
      });

      // change whole sub services of service parameter
      const updatedServiceParameter = { ...parentService, subServices: updatedSubServices };

      // by order we can replace parameter service in array
      const copiedUpdatedServices = [...state.services];
      copiedUpdatedServices[updatedServiceParameter.order] = updatedServiceParameter;

      return { ...state, services: copiedUpdatedServices };
    }

    case UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS: {
      const { title, oldTitle } = payload;

      const updatedServices = state.services.map((service) => {
        if (service.title === oldTitle) return { ...service, title };
        return service;
      });

      return { ...state, services: updatedServices };
    }

    // DELETE_SERVICE
    case DELETE_SERVICE_SUCCESS: {
      const { serviceId } = payload;

      const filteredServices = state.services.filter((service) => service.id !== serviceId);
      console.log(filteredServices);
      const reoderedServices = reoderServices(filteredServices);

      return { ...state, services: reoderedServices };
    }

    case DELETE_SUB_SERVICE_SUCCESS: {
      const { id, title, subOrder, order } = payload;

      // const services = { ...state.services };
      const services = [...state.services];

      const parentIndex = services.findIndex((service) => service.title === title); // find service

      const parentService = services[parentIndex];
      const filteredSubServices = parentService.subServices.filter((service) => service.id !== id); // delete subService

      if (filteredSubServices.length === 0) {
        const filteredServices = services.filter((service) => service.title !== title); // delete old service (parent)
        const reoderedServices = reoderServices(filteredServices, order);
        return { ...state, services: reoderedServices };
      }

      const reoderedSubServices = reoderSubServices(filteredSubServices, subOrder);
      const updatedParentService = { ...parentService, subServices: reoderedSubServices };

      services[parentIndex] = updatedParentService;

      return { ...state, services };
    }

    case DELETE_SERVICE_PARAMETER_SUCCESS: {
      const { title, order } = payload;

      const filteredServices = state.services.filter((service) => title !== service.title);
      const reoderedServices = reoderServices(filteredServices, order);

      return { ...state, services: reoderedServices };
    }

    // REODER
    case REODER_SERVICES: {
      const { source, destination } = payload;

      if (!destination) return state;

      const services = [...state.services];
      const [removedService] = services.splice(source.index, 1);

      services.splice(destination.index, 0, removedService);

      const reoderedServices = services.map((service, index) => {
        service.order = index;
        return service;
      });

      return {
        ...state,
        services: reoderedServices,
      };
    }

    case REODER_SUB_SERVICES: {
      const { source, destination, title } = payload;

      if (!destination) return state;
      // copy state of services
      const services = [...state.services];
      // find parameter service
      const parentIndex = services.findIndex((service) => service.title === title); // find service
      const parentService = services[parentIndex];
      // copy sub-services of parameter service
      const subServices = [...parentService.subServices];
      // remove needing sub service
      const [removedSubService] = subServices.splice(source.index, 1);
      // insert to destination
      subServices.splice(destination.index, 0, removedSubService);
      // change sub-orders of sub-services
      const reoderedSubServices = subServices.map((service, index) => {
        service.subOrder = index;
        return service;
      });
      // change sub-services in parameter service
      parentService.subServices = reoderedSubServices;
      // replace service in services
      services[parentIndex] = parentService;

      return { ...state, services };
    }

    case SET_INITIAL_ORDER: {
      return { ...state, initialOrder: payload };
    }

    case PUT_UPDATE_TO_SERVICES: {
      const { services } = payload;

      const copiedServices = [...state.services];

      // {id and duration}
      services.forEach(({ id, duration }) => {
        let indexes = { service: -1, subService: -1 };

        let serviceIndex = copiedServices.findIndex((service, index) => service.id === id);

        if (serviceIndex !== -1) indexes.service = serviceIndex;
        else {
          serviceIndex = copiedServices.some((service, serviceIndex) => {
            if (!service.subServices) return false;

            service.subServices.some((subService, subServiceIndex) => {
              if (subService.id === id) {
                indexes = { service: serviceIndex, subService: subServiceIndex };
                return true;
              }
            });
          });
        }

        if (indexes.subService !== -1) {
          // parameter service
          const service = copiedServices[indexes.service].subServices[indexes.subService];
          service.update.status = 'suitable';
          service.update.duration = duration;
        } else {
          const service = copiedServices[indexes.service];
          service.update.status = 'suitable';
          service.update.duration = duration;
        }
      });

      return { ...state, services: copiedServices };
    }

    case SERVICES_TO_UNSUITABLE: {
      const { date, sessionTime } = payload;

      let services = [...state.services];

      services = services.map((service) => {
        const isServiceParameter = service.subServices;

        if (isServiceParameter) {
          const subServices = service.subServices.map((subService) => {
            if (subService.duration % sessionTime !== 0)
              subService.update = { date, status: 'unsuitable' };
            return subService;
          });

          service.subServices = subServices;
          return service;
        }

        if (service.duration % sessionTime !== 0) service.update = { date, status: 'unsuitable' };
        return service;
      });

      return { ...state, services };
    }

    case DELETE_SERVICES_UPDATE: {
      let services = [...state.services];

      services = services.map((service) => {
        const isServiceParameter = service.subServices;

        if (isServiceParameter) {
          const subServices = service.subServices.map((subService) => {
            if (subService.update && subService.update.date) subService.update = null;
            return subService;
          });

          service.subServices = subServices;

          return service;
        }

        if (service.update && service.update.date) service.update = null;

        return service;
      });

      return { ...state, services };
    }

    default:
      return state;
  }
};

export default serviceReducer;
