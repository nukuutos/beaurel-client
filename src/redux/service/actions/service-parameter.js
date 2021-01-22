import {
  ADD_SERVICE_PARAMETER_START,
  ADD_SERVICE_PARAMETER_SUCCESS,
  ADD_SERVICE_PARAMETER_FAILURE,
  UPDATE_SUB_SERVICE_START,
  UPDATE_SUB_SERVICE_SUCCESS,
  UPDATE_SUB_SERVICE_FAILURE,
  UPDATE_SERVICE_PARAMETER_TITLE_START,
  UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  UPDATE_SERVICE_PARAMETER_TITLE_FAILURE,
  DELETE_SUB_SERVICE_START,
  DELETE_SUB_SERVICE_SUCCESS,
  DELETE_SUB_SERVICE_FAILURE,
  DELETE_SERVICE_PARAMETER_START,
  DELETE_SERVICE_PARAMETER_SUCCESS,
  DELETE_SERVICE_PARAMETER_FAILURE,
} from '../types/service-parameter';

export const addServiceParameterStart = (service) => ({
  type: ADD_SERVICE_PARAMETER_START,
  payload: service,
});

export const addServiceParameterSuccess = (service) => ({
  type: ADD_SERVICE_PARAMETER_SUCCESS,
  payload: service,
});

export const addServiceParameterFailure = () => ({
  type: ADD_SERVICE_PARAMETER_FAILURE,
});
//
export const updateSubServiceStart = (service) => ({
  type: UPDATE_SUB_SERVICE_START,
  payload: service,
});

export const updateSubServiceSuccess = (service) => ({
  type: UPDATE_SUB_SERVICE_SUCCESS,
  payload: service,
});

export const updateSubServiceFailure = () => ({
  type: UPDATE_SUB_SERVICE_FAILURE,
});
//
export const updateServiceParameterTitleStart = (service) => ({
  type: UPDATE_SERVICE_PARAMETER_TITLE_START,
  payload: service,
});

export const updateServiceParameterTitleSuccess = (service) => ({
  type: UPDATE_SERVICE_PARAMETER_TITLE_SUCCESS,
  payload: service,
});

export const updateServiceParameterTitleFailure = () => ({
  type: UPDATE_SERVICE_PARAMETER_TITLE_FAILURE,
});
//
export const deleteSubServiceStart = (service) => ({
  type: DELETE_SUB_SERVICE_START,
  payload: service,
});

export const deleteSubServiceSuccess = (service) => ({
  type: DELETE_SUB_SERVICE_SUCCESS,
  payload: service,
});

export const deleteSubServiceFailure = () => ({
  type: DELETE_SUB_SERVICE_FAILURE,
});
//
export const deleteServiceParameterStart = (service) => ({
  type: DELETE_SERVICE_PARAMETER_START,
  payload: service,
});

export const deleteServiceParameterSuccess = (service) => ({
  type: DELETE_SERVICE_PARAMETER_SUCCESS,
  payload: service,
});

export const deleteServiceParameterFailure = () => ({
  type: DELETE_SERVICE_PARAMETER_FAILURE,
});
