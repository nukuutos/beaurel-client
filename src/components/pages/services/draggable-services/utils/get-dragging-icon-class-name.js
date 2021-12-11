const getDraggingIconClassName = (isDragging) => {
  let className = 'draggable-service__icon';
  if (isDragging) className += ' draggable-service__icon--dragging';
  return className;
};

export default getDraggingIconClassName;
