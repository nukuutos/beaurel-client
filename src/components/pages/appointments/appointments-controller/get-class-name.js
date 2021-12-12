const getClassName = (state, value) => {
  let className = 'appointment-controller__item';
  if (state === value) className += ' appointment-controller__item--active';
  return className;
};

export default getClassName;
