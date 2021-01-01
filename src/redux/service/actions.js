import {
  GET_SERVICES_FAILURE,
  GET_SERVICES_START,
  GET_SERVICES_SUCCESS,
  ADD_SERVICE_START,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_START,
  DELETE_SERVICE_SUCCESS,
  UPDATE_SERVICE_START,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  REODER_SERVICES,
  REODER_SUB_SERVICES,
  SET_INITIAL_ORDER,
} from './types';

export const getServicesStart = () => ({
  type: GET_SERVICES_START,
});

export const getServicesSuccess = (services) => ({
  type: GET_SERVICES_SUCCESS,
  payload: services,
});

export const getServicesFailure = () => ({
  type: GET_SERVICES_FAILURE,
});

/////////////

export const addServiceStart = (service) => ({
  type: ADD_SERVICE_START,
  payload: service,
});

export const addServiceSuccess = (service) => ({
  type: ADD_SERVICE_SUCCESS,
  payload: service,
});

export const addServiceFailure = () => ({
  type: ADD_SERVICE_FAILURE,
});

///////////////

export const updateServiceStart = (service) => ({
  type: UPDATE_SERVICE_START,
  payload: service,
});

export const updateServiceSuccess = (service) => ({
  type: UPDATE_SERVICE_SUCCESS,
  payload: service,
});

export const updateServiceFailure = () => ({
  type: UPDATE_SERVICE_FAILURE,
});

///////////////

export const deleteServiceStart = (service) => ({
  type: DELETE_SERVICE_START,
  payload: service,
});

export const deleteServiceSuccess = (service) => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: service,
});

export const deleteServiceFailure = () => ({
  type: DELETE_SERVICE_FAILURE,
});

////

export const reoderServices = (result) => ({
  type: REODER_SERVICES,
  payload: result,
});

export const reoderSubServices = (result) => ({
  type: REODER_SUB_SERVICES,
  payload: result,
});

export const setInitialOrder = (order) => ({
  type: SET_INITIAL_ORDER,
  payload: order,
});
