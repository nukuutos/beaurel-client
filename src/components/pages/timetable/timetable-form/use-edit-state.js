import { useReducer } from 'react';

const START_EDIT_SESSION_TIME = 'START_EDIT_SESSION_TIME';
const FINISH_EDIT_SESSION_TIME = 'FINISH_EDIT_SESSION_TIME';
const START_EDIT_WEEKENDS = 'START_EDIT_WEEKENDS';
const FINISH_EDIT_WEEKENDS = 'FINISH_EDIT_WEEKENDS';
const START_EDIT_WORKING_DAY = 'START_EDIT_WORKING_DAY';
const FINISH_EDIT_WORKING_DAY = 'FINISH_EDIT_WORKING_DAY';

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case START_EDIT_SESSION_TIME: {
      return { isEditing: true, element: { ...state.element, sessionTime: true } };
    }

    case FINISH_EDIT_SESSION_TIME: {
      return { isEditing: false, element: { ...state.element, sessionTime: false } };
    }

    case START_EDIT_WEEKENDS: {
      return { isEditing: true, element: { ...state.element, weekends: true } };
    }

    case FINISH_EDIT_WEEKENDS: {
      return { isEditing: false, element: { ...state.element, weekends: false } };
    }

    case START_EDIT_WORKING_DAY: {
      return { isEditing: true, element: { ...state.element, workingDay: true } };
    }

    case FINISH_EDIT_WORKING_DAY: {
      return { isEditing: false, element: { ...state.element, workingDay: false } };
    }

    default:
      return state;
  }
};

const initialState = {
  isEditing: false,
  element: { sessionTime: false, weekends: false, workingDay: false },
};

const useEditState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startEditSessionTime = () => dispatch({ type: START_EDIT_SESSION_TIME });
  const finishEditSessionTime = () => dispatch({ type: FINISH_EDIT_SESSION_TIME });
  const startEditWeekends = () => dispatch({ type: START_EDIT_WEEKENDS });
  const finishEditWeekends = () => dispatch({ type: FINISH_EDIT_WEEKENDS });
  const startEditWorkingDay = () => dispatch({ type: START_EDIT_WORKING_DAY });
  const finishEditWorkingDay = () => dispatch({ type: FINISH_EDIT_WORKING_DAY });

  const actions = {
    startEditSessionTime,
    finishEditSessionTime,
    startEditWeekends,
    finishEditWeekends,
    startEditWorkingDay,
    finishEditWorkingDay,
  };

  return [state, actions];
};

export default useEditState;
