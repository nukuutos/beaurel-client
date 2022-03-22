import React from 'react';
import IndicatorsAndLines from './indicators-and-lines';

const Progress = ({ count, state }) => {
  const [step] = state;
  const isDisabledAfterSubmit = step.current === null && step.last === null;
  const disabledClassName = isDisabledAfterSubmit ? 'progress--disabled' : '';
  const inactiveClassName = step.current === 3 ? 'progress--inactive' : '';

  return (
    <div className={`sign-up__progress progress ${inactiveClassName} ${disabledClassName}`}>
      <IndicatorsAndLines count={count} state={state} />
    </div>
  );
};

export default Progress;
