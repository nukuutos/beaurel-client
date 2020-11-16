const identifyAction = (action) => {
  return action.type.split('_').slice(0, -1).join('_');
};

export const getSuccessType = (action) => {
  return `${identifyAction(action)}_SUCCESS`;
};

export const getFailType = (action) => {
  return `${identifyAction(action)}_FAILURE`;
};
