import { useReducer, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import useMediaQuery from '../../../../hooks/use-media-query';
import carouselReducer from './reducer';
import swipeableConfig from './swipeable-config/swipeable-config';

const transitionToSide = ({ styles, state, length = 1 }) => {
  const totalWidth = 100;
  const transitionTime = 400;

  const { active, desired, offset } = state;

  const dist = Math.abs(active - desired);
  const dir = (dist > length / 2 ? 1 : -1) * Math.sign(desired - active);
  const pref = Math.sign(offset || 0);

  const shift = (totalWidth * (pref || dir)) / length;

  const transition = `transform ${transitionTime}ms ease`;
  const transform = `translateX(${shift}%)`;

  return { ...styles, transition, transform };
};

const initialCarouselState = {
  offset: 0,
  desired: 0,
  active: 0,
};

const createHandlers = ({ onMouseDown, setContainer, ref, active, isPhone }) => ({
  onMouseDown,
  ref(container) {
    if (container && container.firstElementChild && isPhone) {
      const day = container.children[active];
      const dayHeight = window.getComputedStyle(day).getPropertyValue('height');
      const dayHeightPx = dayHeight.split('px')[0];
      const addingHeight = Number(dayHeightPx) + 10;
      const newHeightProperty = `${addingHeight}px`;

      container.style.height = newHeightProperty;
    }

    if (container && container.firstElementChild && !isPhone) container.style.height = 'unset';
    setContainer(container && container.firstElementChild);
    return ref(container);
  },
});

const createStyles = (state, length = 1) => {
  const totalWidth = 100;

  const styles = {
    // transform: "translateX(0)",
    transform: 'unset',
    width: `calc(${totalWidth * length}% + ${1.6 * 2 * length}rem)`,
    left: `calc(-${state.active * totalWidth}% - ${1.6 * 2 * state.active}rem)`,
  };

  return styles;
};

export function useCarousel(length) {
  const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
  const [container, setContainer] = useState(null);
  const isPhone = useMediaQuery(600);
  const { ref, onMouseDown } = useSwipeable(swipeableConfig({ container, dispatch, length }));

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

  let styles = createStyles(state, length);

  const { active, desired } = state;

  const isTransition = desired !== active;

  if (isTransition) styles = transitionToSide({ styles, state, length });

  // const daysRef = useRef(null);
  const heightStyle = {};

  useEffect(() => {
    // const days = daysRef.current;
    // const day = days.children[active];
    // const dayHeight = window.getComputedStyle(day).getPropertyValue("height");
    // days.style.heght = dayHeight;
    // heightStyle = { height: dayHeight };
  }, [state.desired]);

  return [state.desired, handlers, styles, desired - active];
}
