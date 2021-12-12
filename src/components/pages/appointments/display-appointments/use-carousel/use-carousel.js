import { useReducer, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import createHandlers from './create-handlers';
import createStyles from './create-styles';
import carouselReducer from './reducer';
import swipeableConfig from './swipeable-config/swipeable-config';
import transitionToSide from './transition-to-side';

const initialCarouselState = {
  offset: 0,
  desired: 0,
  active: 0,
};

function useCarousel(pageState) {
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
  const [container, setContainer] = useState(null);
  const [{ appointments: appointmentsState }, { isPhone }] = useSelector((state) => [
    state.appointments,
    state.screenSize,
  ]);

  const { user, category } = pageState;
  const { appointments } = appointmentsState[user][category];

  const daysCount = Object.keys(appointments).length;

  const { ref, onMouseDown } = useSwipeable(
    swipeableConfig({ container, dispatch, length: daysCount })
  );

  const handlers = createHandlers({
    onMouseDown,
    setContainer,
    ref,
    active: state.desired,
    isPhone,
  });

  useEffect(() => {
    const transitionTime = 400;
    const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
    return () => clearTimeout(id);
  }, [state.desired]);

  let styles = createStyles(state, daysCount);

  const { active, desired } = state;

  const isTransition = desired !== active;

  if (isTransition) styles = transitionToSide({ styles, state, length: daysCount });

  return [state.desired, handlers, styles, desired - active];
}

export default useCarousel;
