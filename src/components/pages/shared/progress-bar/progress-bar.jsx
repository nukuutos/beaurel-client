import React from 'react';
import IndicatorsAndLines from './indicators-and-lines';

const ProgressBar = ({ className = '', count, state, getGoToPickedStep }) => (
  <div className={`sign-up__progress progress ${className}`}>
    <IndicatorsAndLines count={count} state={state} getGoToPickedStep={getGoToPickedStep} />
  </div>
);

export default ProgressBar;
