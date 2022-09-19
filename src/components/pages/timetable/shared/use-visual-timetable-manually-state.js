import { useReducer } from 'react';

const CLOSE = 'CLOSE';
const OPEN = 'OPEN';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPEN:
      return { ...state, isOpen: true, weekdayIndex: payload };

    case CLOSE:
      return { ...state, isOpen: false, weekdayIndex: null };

    default:
      return state;
  }
};

const initialState = { isOpen: false, weekdayIndex: null };

const useVisualTimetableManuallyState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getOpenModal = (index) => () => dispatch({ type: OPEN, payload: index });
  const closeModal = () => dispatch({ type: CLOSE });

  const actions = { getOpenModal, closeModal };

  return [state, actions];
};

export default useVisualTimetableManuallyState;
