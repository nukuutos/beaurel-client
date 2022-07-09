import React from 'react';
import IndicatorsAndLines from './indicators-and-lines';

const ProgressBar = ({ className = '', count, state }) => (
  <div className={`sign-up__progress progress ${className}`}>
    <IndicatorsAndLines count={count} state={state} />
  </div>
);

export default ProgressBar;
