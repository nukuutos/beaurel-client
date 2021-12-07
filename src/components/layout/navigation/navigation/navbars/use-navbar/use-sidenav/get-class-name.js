const getClassName = (routerPath, linkPath) => {
  let className = 'mobile-navbar__item ';
  if (routerPath === linkPath) className += 'mobile-navbar__item--active';
  return className;
};

export default getClassName;
