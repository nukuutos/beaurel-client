import { useSwipeable } from 'react-swipeable';

const useCarouselSwipeable = ({ goToPrevWork, goToNextWork }) => {
  const handlers = useSwipeable({
    onSwipedLeft: goToPrevWork,
    onSwipedRight: goToNextWork,
    delta: 10,
  });

  return [handlers];
};

export default useCarouselSwipeable;
