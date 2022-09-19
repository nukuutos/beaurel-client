import React from 'react';
import ProgressBar from '../../shared/progress-bar/progress-bar';

const Progress = ({ count, state, ...actions }) => {
  const { last, current } = state;
  const isDisabledAfterSubmit = current === null && last === null;
  const disabledClassName = isDisabledAfterSubmit ? 'progress--disabled' : '';

  return <ProgressBar className={disabledClassName} count={count} state={state} {...actions} />;
};

export default Progress;
