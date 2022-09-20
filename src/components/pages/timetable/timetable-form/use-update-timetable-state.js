import { useReducer } from 'react';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const NEED_TO_UPDATE_SERVICES = 'NEED_TO_UPDATE_SERVICES';
const GO_TO_UPDATE_SERVICES = 'GO_TO_UPDATE_SERVICES';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_MODAL:
      return { ...state, isVisible: true };

    case CLOSE_MODAL:
      return { ...state, isVisible: false, step: 0 };

    case NEED_TO_UPDATE_SERVICES:
      return { ...state, step: 1, servicesCountToUpdate: payload };

    case GO_TO_UPDATE_SERVICES:
      return { ...state, step: 2 };

    default:
      return state;
  }
};

const initialState = {
  isVisible: false,
  servicesCountToUpdate: null,
  step: 0,
};

const useUpdateTimetableState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = () => dispatch({ type: OPEN_MODAL });
  const closeModal = () => dispatch({ type: CLOSE_MODAL });
  const goToUpdateServices = () => dispatch({ type: GO_TO_UPDATE_SERVICES });
  const needToUpdateServices = (servicesNumberToUpdate) =>
    dispatch({ type: NEED_TO_UPDATE_SERVICES, payload: servicesNumberToUpdate });

  const actions = { openModal, closeModal, goToUpdateServices, needToUpdateServices };

  return [state, actions];
};

export default useUpdateTimetableState;
