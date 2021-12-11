const getClassName = (state, value) => {
  let className = 'reorder-controller__item';
  if (state === value) className += ' reorder-controller__item--active';
  return className;
};

export default getClassName;
