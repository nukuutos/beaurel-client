import { useReducer } from 'react';

const RESET = 'RESET';
const DISABLE = 'DISABLE';
const GO_TO_NEXT_STEP = 'GO_TO_NEXT_STEP';
const GO_TO_PICKED_STEP = 'GO_TO_PICKED_STEP';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DISABLE: {
      return { current: null, last: null };
    }

    case GO_TO_NEXT_STEP: {
      const { current, last } = state;

      const newLast = current === last ? last + 1 : last;
      const newCurrent = current + 1;

      return { ...state, current: newCurrent, last: newLast };
    }

    case RESET: {
      return { ...state, current: 1, last: 1 };
    }

    case GO_TO_PICKED_STEP: {
      return { ...state, current: payload };
    }

    default:
      return state;
  }
};

const initialState = { current: 1, last: 1 };

const useProgress = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetProgress = () => dispatch({ type: RESET });
  const disableProgressBar = () => dispatch({ type: DISABLE });
  const goToNextStep = () => dispatch({ type: GO_TO_NEXT_STEP });

  const getGoToPickedStep = (index) => () => dispatch({ type: GO_TO_PICKED_STEP, payload: index });

  const actions = { resetProgress, disableProgressBar, goToNextStep, getGoToPickedStep };

  return [state, actions];
};

export default useProgress;
