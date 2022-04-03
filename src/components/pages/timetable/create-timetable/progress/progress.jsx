import React from 'react';
import IndicatorsAndLines from './indicators-and-lines';

const Progress = ({ count, state }) => (
  <div className="sign-up__progress progress">
    <IndicatorsAndLines count={count} state={state} />
  </div>
);

export default Progress;
