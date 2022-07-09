import React from 'react';
import Indicator from './indicator';
import Line from './line';

const IndicatorsAndLines = ({ count, state }) => {
  const [{ current, last }, setState] = state;

  const components = [];

  for (let i = 1; i <= count; i++) {
    const isPassed = i <= last;
    const isCurrent = i === current;

    components.push(
      <Indicator
        isPassed={isPassed}
        isCurrent={isCurrent}
        setState={setState}
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
