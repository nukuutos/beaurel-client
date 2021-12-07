const getClassName = (routerPath, linkPath) => {
  let className = 'navbar__link ';
  if (routerPath === linkPath) className += 'navbar__link--active';
  return className;
};

export default getClassName;
