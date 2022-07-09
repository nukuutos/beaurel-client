import { useSwipeable } from 'react-swipeable';

const useSwipes = ({ index, masterOptionOnClick, customerOptionOnClick }) => {
  const handlers = useSwipeable({
    onSwipedRight: () => (index === 1 ? masterOptionOnClick() : null),
    onSwipedLeft: () => (index === 0 ? customerOptionOnClick() : null),
    delta: 10,
  });

  return handlers;
};

export default useSwipes;
