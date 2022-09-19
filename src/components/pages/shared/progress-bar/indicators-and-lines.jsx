import React from 'react';
import Indicator from './indicator';
import Line from './line';

const IndicatorsAndLines = ({ count, state, getGoToPickedStep }) => {
  const { current, last } = state;

  const components = [];

  for (let i = 1; i <= count; i++) {
    const isPassed = i <= last;
    const isCurrent = i === current;
    const goToPickedStep = getGoToPickedStep(i);

    components.push(
      <Indicator
        isPassed={isPassed}
        isCurrent={isCurrent}
        onClick={goToPickedStep}
        index={i}
        key={`indicator-${i}`}
      />
    );

    if (i !== count) {
      const isPassedLine = isPassed && i !== last;
      components.push(<Line isPassed={isPassedLine} key={`line-${i}`} />);
    }
  }

  return components;
};

export default IndicatorsAndLines;
