import React from 'react';
import ProgressBar from '../../shared/progress-bar/progress-bar';

const Progress = ({ count, state, getGoToPickedStep }) => {
  const { current, last } = state;
  const isDisabledAfterSubmit = current === null && last === null;
  const disabledClassName = isDisabledAfterSubmit ? 'progress--disabled' : '';
  const inactiveClassName = current === 3 ? 'progress--inactive' : '';
  const className = `${disabledClassName} ${inactiveClassName}`;

  return (
    <ProgressBar
      className={className}
      count={count}
      state={state}
      getGoToPickedStep={getGoToPickedStep}
    />
  );
};

export default Progress;
