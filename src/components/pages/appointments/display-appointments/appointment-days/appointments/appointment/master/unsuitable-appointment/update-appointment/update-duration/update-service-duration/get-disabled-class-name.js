const getDisabledClassName = (duration, sessionTime) => {
  if (duration % sessionTime === 0) return '';
  return 'btn--disabled';
};

export default getDisabledClassName;
