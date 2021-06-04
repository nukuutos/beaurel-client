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
} from '../types/service';

export const getServicesSuccess = (services) => ({
  type: GET_SERVICES_SUCCESS,
  payload: services,
});

export const addServiceSuccess = (service) => ({
  type: ADD_SERVICE_SUCCESS,
  payload: service,
});

export const updateServiceSuccess = (service) => ({
  type: UPDATE_SERVICE_SUCCESS,
  payload: service,
});

export const deleteServiceSuccess = (service) => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: service,
});

export const reoderServices = (result) => ({
  type: REODER_SERVICES,
  payload: result,
});

export const reoderSubServices = (result) => ({
  type: REODER_SUB_SERVICES,
  payload: result,
});

// ?
export const setInitialOrder = (order) => ({
  type: SET_INITIAL_ORDER,
  payload: order,
});

export const putUpdateToServices = (services) => ({
  type: PUT_UPDATE_TO_SERVICES,
  payload: services,
});

export const servicesToUnsuitable = (timetableProps) => ({
  type: SERVICES_TO_UNSUITABLE,
  payload: timetableProps,
});

export const deleteServicesUpdate = () => ({
  type: DELETE_SERVICES_UPDATE,
});
