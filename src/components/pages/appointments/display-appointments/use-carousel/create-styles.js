const createStyles = (state, length = 1) => {
  const totalWidth = 100;

  const styles = {
    transform: 'unset',
    width: `calc(${totalWidth * length}% + ${1.6 * 2 * length}rem)`,
    left: `calc(-${state.active * totalWidth}% - ${1.6 * 2 * state.active}rem)`,
  };

  return styles;
};

export default createStyles;
