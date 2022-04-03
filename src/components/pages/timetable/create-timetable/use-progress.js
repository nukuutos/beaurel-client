import { useState } from 'react';

const useProgress = () => {
  const [state, setState] = useState({ current: 1, last: 1 });

  const resetProgress = () => setState(() => ({ current: 2, last: 2 }));
  const goNext = () =>
    setState(() => {
      const last = state.current === state.last ? state.last + 1 : state.last;
      const current = state.current + 1;
      return { current, last };
    });

  const actions = { resetProgress, goNext };

  return [state, setState, actions];
};

export default useProgress;
