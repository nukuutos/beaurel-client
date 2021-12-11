const getTitleClassName = ({ isAbleToDragging, isDragging }) => {
  let className = 'service';

  if (isAbleToDragging) className += ' draggable-service';

  const isHoverClassName = isAbleToDragging || isDragging;

  if (isHoverClassName) className += ' service--hover';

  return className;
};

export default getTitleClassName;
