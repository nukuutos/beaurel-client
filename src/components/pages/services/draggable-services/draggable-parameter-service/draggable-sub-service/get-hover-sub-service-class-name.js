const getHoverSubServiceClassName = (isHover, isDragging) => {
  const hoverClassName = 'service--hover';
  if (isHover || isDragging) return hoverClassName;
  return '';
};

export default getHoverSubServiceClassName;
