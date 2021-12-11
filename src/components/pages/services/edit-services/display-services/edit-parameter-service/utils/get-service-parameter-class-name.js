const getServiceParameterClassName = (isShown, isHoverSubService) => {
  let className = 'service-parameter';
  if (isShown && !isHoverSubService) className += ' service-parameter--hover';
  return className;
};

export default getServiceParameterClassName;
