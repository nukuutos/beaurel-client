import {
  ADD_SERVICE_PARAMETER_SUCCESS,
  UPDATE_SUB_SERVICE_SUCCESS,
  UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  DELETE_SUB_SERVICE_SUCCESS,
  DELETE_SERVICE_PARAMETER_SUCCESS,
} from '../types/service-parameter';

export const addServiceParameterSuccess = (service) => ({
  type: ADD_SERVICE_PARAMETER_SUCCESS,
  payload: service,
});

export const updateSubServiceSuccess = (service) => ({
  type: UPDATE_SUB_SERVICE_SUCCESS,
  payload: service,
});

export const updateServiceParameterTitleSuccess = (service) => ({
  type: UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  payload: service,
});

export const deleteSubServiceSuccess = (service) => ({
  type: DELETE_SUB_SERVICE_SUCCESS,
  payload: service,
});

export const deleteServiceParameterSuccess = (service) => ({
  type: DELETE_SERVICE_PARAMETER_SUCCESS,
  payload: service,
});
