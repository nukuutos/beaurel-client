import { useSelector } from 'react-redux';

const useGoToWork = (setState) => {
  const { works } = useSelector((state) => state.work);

  const getPrevWork = (state, works) => (state.index + works.length - 1) % works.length;
  const getNextWork = (state, works) => (state.index + 1) % works.length;

  const toPrevWork = () => setState((state) => ({ ...state, index: getPrevWork(state, works) }));
  const toNextWork = () => setState((state) => ({ ...state, index: getNextWork(state, works) }));

  return { toNextWork, toPrevWork };
};

export default useGoToWork;
