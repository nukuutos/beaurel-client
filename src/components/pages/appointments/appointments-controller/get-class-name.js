const getIsNotification = (statuses) => {
  for (const status in statuses) {
    if (statuses[status]) return true;
  }

  return false;
};

const getClassName = (state, value, isNotification) => {
  let className = 'appointment-controller__item';

  if (state === value) {
    className += ' appointment-controller__item--active';
  }

  if (getIsNotification(isNotification[value])) {
    className += ' appointment-controller__item--notification';
  }

  return className;
};

export default getClassName;
