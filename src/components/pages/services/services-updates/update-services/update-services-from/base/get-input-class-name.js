const getInputClassName = (duration, sessionTime) => {
  const isDurationCorrect = duration % sessionTime === 0;
  const className = isDurationCorrect ? 'input--success' : 'input--error';
  return className;
};

export default getInputClassName;
