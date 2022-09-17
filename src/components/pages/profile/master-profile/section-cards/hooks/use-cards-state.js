import { useReducer } from 'react';

const CLOSE_MASTER_WORKS = 'CLOSE_MASTER_WORKS';
const CLOSE_SERVICES = 'CLOSE_SERVICES';
const CLOSE_TIMETABLE = 'CLOSE_TIMETABLE';
const OPEN_MASTER_WORKS = 'OPEN_MASTER_WORKS';
const OPEN_SERVICES = 'OPEN_SERVICES';
const OPEN_TIMETABLE = 'OPEN_TIMETABLE';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case CLOSE_MASTER_WORKS:
      return { ...state, isMasterWorks: false };

    case CLOSE_SERVICES:
      return { ...state, isServices: false };

    case CLOSE_TIMETABLE:
      return { ...state, isTimetable: false };

    case OPEN_MASTER_WORKS:
      return { ...state, isMasterWorks: true };

    case OPEN_SERVICES:
      return { ...state, isServices: true };

    case OPEN_TIMETABLE:
      return { ...state, isTimetable: true };

    default:
      return state;
  }
};

const initialState = {
  isMasterWorks: false,
  isServices: false,
  isTimetable: false,
};

const useCardsState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeMasterWorks = () => dispatch({ type: CLOSE_MASTER_WORKS });
  const closeServices = () => dispatch({ type: CLOSE_SERVICES });
  const closeTimetable = () => dispatch({ type: CLOSE_TIMETABLE });

  const openMasterWorks = () => dispatch({ type: OPEN_MASTER_WORKS });
  const openServices = () => dispatch({ type: OPEN_SERVICES });
  const openTimetable = () => dispatch({ type: OPEN_TIMETABLE });

  const closeActions = { closeMasterWorks, closeServices, closeTimetable };
  const openActions = { openMasterWorks, openServices, openTimetable };

  return [state, { closeActions, openActions }];
};

export default useCardsState;
