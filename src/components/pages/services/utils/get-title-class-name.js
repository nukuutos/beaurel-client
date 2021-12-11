const getTitleClassName = (isShown) => {
  let className = 'service-parameter';
  if (isShown) className += '--expand';
  else className += ' service--hover';
  return className;
};

export default getTitleClassName;
