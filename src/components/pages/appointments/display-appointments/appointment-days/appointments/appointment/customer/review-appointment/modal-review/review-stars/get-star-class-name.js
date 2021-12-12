const getStarClassName = (starSize, isActiveStar) => {
  let className = `stars__star--${starSize} edit-review__star`;
  if (isActiveStar) className += ' edit-review__star--active';
  return className;
};

export default getStarClassName;
