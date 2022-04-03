import React from 'react';

const Indicator = ({ index, isCurrent, isPassed, setState }) => {
  const currentClassName = isCurrent ? 'progress__indicator--active' : '';
  const passedClassName = isPassed && !isCurrent ? 'progress__indicator--passed' : '';

  const goToPassed = () => setState((state) => ({ ...state, current: index }));

  return (
    <div
      onClick={goToPassed}
      className={`progress__indicator ${currentClassName} ${passedClassName}`}
    >
      {index}
    </div>
  );
};

export default Indicator;
