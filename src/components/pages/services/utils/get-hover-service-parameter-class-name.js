const getHoverServiceParameterClassName = ({ isShown, isSubServiceHover }) => {
  const isHoverServiceParameter = isShown && !isSubServiceHover;
  if (isHoverServiceParameter) return ' service-parameter--hover';
  return '';
};

export default getHoverServiceParameterClassName;
