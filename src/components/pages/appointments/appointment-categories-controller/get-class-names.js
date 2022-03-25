const getClassName = (state, value, additionalClassName, isNotification = {}) => {
  let className = 'appointment-types__type';
  if (state === value) className += ` appointment-types__type--active ${additionalClassName}`;
  else if (isNotification[value]) {
    className += ' appointment-types__type--notification';
  }
  return className;
};

const getClassNames = (category, isNotification) => {
  const onConfirmationClassName = getClassName(
    category,
    'onConfirmation',
    'appointment-types__type--waiting',
    isNotification
  );

  const confirmedClassName = getClassName(
    category,
    'confirmed',
    'appointment-types__type--confirmed',
    isNotification
  );
  const unsuitableClassName = getClassName(
    category,
    'unsuitable',
    'appointment-types__type--unsuitable',
    isNotification
  );
  const historyClassName = getClassName(category, 'history', 'appointment-types__type--history');

  return { onConfirmationClassName, confirmedClassName, unsuitableClassName, historyClassName };
};

export default getClassNames;
