import { useSwipeable } from 'react-swipeable';

const useCarouselSwipeable = ({ toPrevWork, toNextWork }) => {
  const handlers = useSwipeable({
    onSwipedLeft: toPrevWork,
    onSwipedRight: toNextWork,
    delta: 10,
  });

  return [handlers];
};

export default useCarouselSwipeable;
