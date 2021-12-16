import {
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  REORDER_SERVICES,
  REORDER_SUB_SERVICES,
  SET_INITIAL_ORDER,
  PUT_UPDATE_TO_SERVICES,
  SERVICES_TO_UNSUITABLE,
  DELETE_SERVICES_UPDATE,
} from '../types/service';

import {
  ADD_SERVICE_PARAMETER_SUCCESS,
  UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  UPDATE_SUB_SERVICE_SUCCESS,
  DELETE_SUB_SERVICE_SUCCESS,
  DELETE_SERVICE_PARAMETER_SUCCESS,
} from '../types/service-parameter';

import addService from './cases/add-service';
import addServiceParameter from './cases/add-service-parameter';
import deleteService from './cases/delete-service';
import deleteServiceParameter from './cases/delete-service-parameter';
import deleteSubService from './cases/delete-sub-service';
import getServices from './cases/get-services';
import updateService from './cases/update-service';
import updateServiceParameterTitle from './cases/update-service-parameter-title';
import updateSubService from './cases/update-sub-service';
import reorderServices from './cases/reorder-services';
import reorderSubServices from './cases/reorder-sub-services';
import setInitialOrder from './cases/set-initial-order';
import putUpdateToServices from './cases/put-update-to-services';
import servicesToUnsuitable from './cases/services-to-unsuitable';
import deleteServicesUpdate from './cases/delete-services-update';

const INITIAL_STATE = { masterId: null, services: [], initialOrder: null };

// eslint-disable-next-line default-param-last
const serviceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_SUCCESS:
      return getServices(state, payload);

    case ADD_SERVICE_SUCCESS:
      return addService(state, payload);

    case ADD_SERVICE_PARAMETER_SUCCESS:
      return addServiceParameter(state, payload);

    case UPDATE_SERVICE_SUCCESS:
      return updateService(state, payload);

    case UPDATE_SUB_SERVICE_SUCCESS:
      return updateSubService(state, payload);

    case UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS:
      return updateServiceParameterTitle(state, payload);

    case DELETE_SERVICE_SUCCESS:
      return deleteService(state, payload);

    case DELETE_SUB_SERVICE_SUCCESS:
      return deleteSubService(state, payload);

    case DELETE_SERVICE_PARAMETER_SUCCESS:
      return deleteServiceParameter(state, payload);

    case REORDER_SERVICES:
      return reorderServices(state, payload);

    case REORDER_SUB_SERVICES:
      return reorderSubServices(state, payload);

    case SET_INITIAL_ORDER:
      return setInitialOrder(state, payload);

    case PUT_UPDATE_TO_SERVICES:
      return putUpdateToServices(state, payload);

    case SERVICES_TO_UNSUITABLE:
      return servicesToUnsuitable(state, payload);

    case DELETE_SERVICES_UPDATE:
      return deleteServicesUpdate(state, payload);

    default:
      return state;
  }
};

export default serviceReducer;
