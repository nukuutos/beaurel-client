import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

const CLOSE_CAROUSEL = 'CLOSE_CAROUSEL';
const GO_TO_ADD_WORK = 'GO_TO_ADD_WORK';
const CLICK_ON_WORK = 'CLICK_ON_WORK';
const GO_TO_CAROUSEL = 'GO_TO_CAROUSEL';
const GO_TO_NEXT_WORK = 'GO_TO_NEXT_WORK';
const GO_TO_PREV_WORK = 'GO_TO_PREV_WORK';
const GO_TO_GALLERY = 'GO_TO_GALLERY';
const GO_TO_EDIT_WORK = 'GO_TO_EDIT_WORK';
const INCREASE_WORKS_LENGTH = 'INCREASE_WORKS_LENGTH';
const DECREASE_WORKS_LENGTH = 'DECREASE_WORKS_LENGTH';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLOSE_CAROUSEL: {
      return { ...state, index: null, display: 'works' };
    }

    case GO_TO_ADD_WORK: {
      return { ...state, display: 'add' };
    }

    case CLICK_ON_WORK: {
      return { ...state, index: payload, display: 'carousel' };
    }

    case GO_TO_CAROUSEL: {
      return { ...state, display: 'carousel' };
    }

    case GO_TO_NEXT_WORK: {
      const nextIndex = (state.index + 1) % state.length;
      return { ...state, index: nextIndex };
    }

    case GO_TO_PREV_WORK: {
      const prevIndex = (state.index + state.length - 1) % state.length;
      return { ...state, index: prevIndex };
    }

    case GO_TO_GALLERY: {
      return { ...state, display: 'works' };
    }

    case GO_TO_EDIT_WORK: {
      return { ...state, display: 'edit' };
    }

    case INCREASE_WORKS_LENGTH: {
      return { ...state, length: state.length + 1 };
    }

    case DECREASE_WORKS_LENGTH: {
      return { ...state, length: state.length - 1 };
    }

    default:
      return state;
  }
};

const getInitialState = (worksLength) => ({ index: null, display: 'works', length: worksLength });

const useMasterWorksState = () => {
  const { works } = useSelector((state) => state.work);

  const initialState = getInitialState(works.length);

  const [state, dispatch] = useReducer(reducer, initialState);

  const getClickOnWork = (index) => () => dispatch({ type: CLICK_ON_WORK, payload: index });

  const closeCarousel = () => dispatch({ type: CLOSE_CAROUSEL });
  const goToAddWork = () => dispatch({ type: GO_TO_ADD_WORK });
  const goToPrevWork = () => dispatch({ type: GO_TO_PREV_WORK });
  const goToNextWork = () => dispatch({ type: GO_TO_NEXT_WORK });
  const goToCarousel = () => dispatch({ type: GO_TO_CAROUSEL });
  const goToGallery = () => dispatch({ type: GO_TO_GALLERY });
  const goToEditWork = () => dispatch({ type: GO_TO_EDIT_WORK });
  const increaseWorksLength = () => dispatch({ type: INCREASE_WORKS_LENGTH });
  const decreaseWorksLength = () => dispatch({ type: DECREASE_WORKS_LENGTH });

  useEffect(() => {
    if (works.length > state.length) {
      increaseWorksLength();
    } else if (works.length < state.length) {
      decreaseWorksLength();
    }
  }, [works.length, state.length]);

  const actions = {
    goToEditWork,
    closeCarousel,
    goToAddWork,
    getClickOnWork,
    goToNextWork,
    goToPrevWork,
    goToCarousel,
    goToGallery,
  };

  return [state, actions];
};

export default useMasterWorksState;
