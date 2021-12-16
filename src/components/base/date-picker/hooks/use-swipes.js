import { useSwipeable } from 'react-swipeable';

const useSwipes = ({ handleClicks, isArrowDisabled }) => {
  const { handleNext, handlePrev } = handleClicks;

  const handlers = useSwipeable({
    onSwipedRight: () => (isArrowDisabled ? null : handlePrev()),
    onSwipedLeft: () => handleNext(),
    delta: 10,
  });

  return handlers;
};

export default useSwipes;
