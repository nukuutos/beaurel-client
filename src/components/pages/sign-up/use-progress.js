import { useState } from 'react';

const useProgress = () => {
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

  return [state, setState, actions];
};

export default useProgress;
