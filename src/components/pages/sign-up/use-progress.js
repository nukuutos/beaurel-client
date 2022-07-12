import { useState } from 'react';

const useProgress = (disabledStep) => {
  const [state, setState] = useState({ current: 1, last: 1 });

  const resetProgress = () => setState(() => ({ current: 1, last: 1 }));
  const disableProgressBar = () => setState(() => ({ current: null, last: null }));
  const goToNextStep = () =>
    setState(() => {
      const last = state.current === state.last ? state.last + 1 : state.last;
      const current = state.current + 1;
      return { current, last };
    });

  const actions = { resetProgress, disableProgressBar, goToNextStep };

  const setStateWrapper = (cb) => {
    const getNull = () => null;
    if (disabledStep && state.current === disabledStep) {
      return getNull;
    }

    return setState(cb);
  };

  return [state, setStateWrapper, actions];
};

export default useProgress;
