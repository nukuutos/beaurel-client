import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import handleAddService from './cases/add-service';
import handleAddServiceParameter from './cases/add-service-parameter';
import handleDeleteService from './cases/delete-service';
import handleDeleteServiceParameter from './cases/delete-service-parameter';
import handleDeleteSubService from './cases/delete-sub-service';
import handleGetServices from './cases/get-services';
import handleUpdateService from './cases/update-service';
import handleUpdateServiceParameterTitle from './cases/update-service-parameter-title';
import handleUpdateSubService from './cases/update-sub-service';
import handleReorderServices from './cases/reorder-services';
import handleReorderSubServices from './cases/reorder-sub-services';
import handleSetInitialOrder from './cases/set-initial-order';
import handlePutUpdateToServices from './cases/put-update-to-services';
import handleServicesToUnsuitable from './cases/services-to-unsuitable';
import handleDeleteServicesUpdate from './cases/delete-services-update';

const initialState = { masterId: null, services: [], initialOrder: null };

const slice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    getServices: (state, action) => handleGetServices(state, action.payload),
    addService: (state, action) => handleAddService(state, action.payload),
    addServiceParameter: (state, action) => handleAddServiceParameter(state, action.payload),
    updateService: (state, action) => handleUpdateService(state, action.payload),
    updateSubService: (state, action) => handleUpdateSubService(state, action.payload),
    updateServiceParameterTitle: (state, action) =>
      handleUpdateServiceParameterTitle(state, action.payload),
    deleteService: (state, action) => handleDeleteService(state, action.payload),
    deleteSubService: (state, action) => handleDeleteSubService(state, action.payload),
    deleteServiceParameter: (state, action) => handleDeleteServiceParameter(state, action.payload),
    reorderServices: (state, action) => handleReorderServices(state, action.payload),
    reorderSubServices: (state, action) => handleReorderSubServices(state, action.payload),
    setInitialOrder: (state, action) => handleSetInitialOrder(state, action.payload),
    putUpdateToServices: (state, action) => handlePutUpdateToServices(state, action.payload),
    servicesToUnsuitable: (state, action) => handleServicesToUnsuitable(state, action.payload),
    deleteServiceUpdate: (state, action) => handleDeleteServicesUpdate(state, action.payload),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.services,
    }),
  },
});

const { actions, reducer } = slice;

export const {
  getServices,
  addService,
  addServiceParameter,
  updateService,
  updateSubService,
  updateServiceParameterTitle,
  deleteService,
  deleteSubService,
  deleteServiceParameter,
  reorderServices,
  reorderSubServices,
  setInitialOrder,
  putUpdateToServices,
  servicesToUnsuitable,
  deleteServiceUpdate,
} = actions;

export default reducer;
