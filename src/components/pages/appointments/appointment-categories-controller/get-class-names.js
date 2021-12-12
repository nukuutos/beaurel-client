const getClassName = (state, value, additionalClassName) => {
  let className = 'appointment-types__type';
  if (state === value) className += ` appointment-types__type--active ${additionalClassName}`;
  return className;
};

const getClassNames = (category) => {
  const onConfirmationClassName = getClassName(
    category,
    'onConfirmation',
    'appointment-types__type--waiting'
  );

  const confirmedClassName = getClassName(
    category,
    'confirmed',
    'appointment-types__type--confirmed'
  );
  const unsuitableClassName = getClassName(
    category,
    'unsuitable',
    'appointment-types__type--unsuitable'
  );
  const historyClassName = getClassName(category, 'history', 'appointment-types__type--history');

  return { onConfirmationClassName, confirmedClassName, unsuitableClassName, historyClassName };
};

export default getClassNames;
