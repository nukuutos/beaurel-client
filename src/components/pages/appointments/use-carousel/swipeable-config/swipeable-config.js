import { createGoAction } from "./actions";
import { getDirection } from "./utils";

const handleOnSwipe = ({ event, length, dispatch }) => {
  const { deltaX } = event;
  const [direction, directionName] = getDirection(deltaX);
  const goAction = createGoAction(directionName, length);
  dispatch(goAction);
};

const swipeableConfig = ({ dispatch, length }) => ({
  onSwipedLeft: (event) => handleOnSwipe({ event, length, dispatch }),
  onSwipedRight: (event) => handleOnSwipe({ event, length, dispatch }),
  trackMouse: true,
  trackTouch: true,
});

export default swipeableConfig;
