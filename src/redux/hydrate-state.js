const hydrateState = (prevState, nextState) => {
  const state = {};

  for (const key in prevState) {
    const prevValue = prevState[key];
    const nextValue = nextState[key];

    state[key] = prevValue || nextValue;
  }

  return state;
};

export default hydrateState;
