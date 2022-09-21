import { useReducer } from 'react';
import { useSelector } from 'react-redux';

const SET_MASTER = 'SET_MASTER';
const SET_CUSTOMER = 'SET_CUSTOMER';

const SET_ON_CONFIRMATION = 'SET_ON_CONFIRMATION';
const SET_CONFIRMED = 'SET_CONFIRMED';
const SET_UNSUITABLE = 'SET_UNSUITABLE';
const SET_HISTORY = 'SET_HISTORY';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case SET_MASTER:
      return { ...state, user: 'master' };

    case SET_CUSTOMER:
      return { ...state, user: 'customer' };

    case SET_ON_CONFIRMATION:
      return { ...state, category: 'onConfirmation' };

    case SET_CONFIRMED:
      return { ...state, category: 'confirmed' };

    case SET_UNSUITABLE:
      return { ...state, category: 'unsuitable' };

    case SET_HISTORY:
      return { ...state, category: 'history' };

    default:
      return state;
  }
};

const getInitialState = (role) => ({ user: role, category: 'onConfirmation' });

const useAppointmentsState = () => {
  const { role } = useSelector((state) => state.auth);

  const initialState = getInitialState(role);

  const [state, dispatch] = useReducer(reducer, initialState);

  const setMaster = () => dispatch({ type: SET_MASTER });
  const setCustomer = () => dispatch({ type: SET_CUSTOMER });

  const setOnConfirmation = () => dispatch({ type: SET_ON_CONFIRMATION });
  const setConfirmed = () => dispatch({ type: SET_CONFIRMED });
  const setUnsuitable = () => dispatch({ type: SET_UNSUITABLE });
  const setHistory = () => dispatch({ type: SET_HISTORY });

  const actions = {
    setMaster,
    setCustomer,
    setOnConfirmation,
    setConfirmed,
    setUnsuitable,
    setHistory,
  };

  return [state, actions];
};

export default useAppointmentsState;
