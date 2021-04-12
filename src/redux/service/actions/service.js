import {
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  REODER_SERVICES,
  REODER_SUB_SERVICES,
  SET_INITIAL_ORDER,
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
