import React from 'react';
import ProgressBar from '../../shared/progress-bar/progress-bar';

const Progress = ({ count, state }) => {
  const [step] = state;
  const isDisabledAfterSubmit = step.current === null && step.last === null;
  const disabledClassName = isDisabledAfterSubmit ? 'progress--disabled' : '';

  return <ProgressBar className={disabledClassName} count={count} state={state} />;
};

export default Progress;
