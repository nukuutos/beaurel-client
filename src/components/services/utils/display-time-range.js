import displayDuration from './display-duration';

const displayTimeRange = (startAt, duration) => {
  return `${displayDuration(startAt)} - ${displayDuration(startAt + duration)}`;
};

export default displayTimeRange;
