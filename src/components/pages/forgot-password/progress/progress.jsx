import React from 'react';
import ProgressBar from '../../shared/progress-bar/progress-bar';

const Progress = ({ count, state }) => {
  const [step] = state;
  const isDisabledAfterSubmit = step.current === null && step.last === null;
  const disabledClassName = isDisabledAfterSubmit ? 'progress--disabled' : '';
  const inactiveClassName = step.current === 3 ? 'progress--inactive' : '';
  const className = `${disabledClassName} ${inactiveClassName}`;

  return <ProgressBar className={className} count={count} state={state} />;
};

export default Progress;
