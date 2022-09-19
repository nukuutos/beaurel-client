import React from 'react';

const Indicator = ({ index, isCurrent, isPassed, onClick }) => {
  const currentClassName = isCurrent ? 'progress__indicator--active' : '';
  const passedClassName = isPassed && !isCurrent ? 'progress__indicator--passed' : '';

  return (
    <div onClick={onClick} className={`progress__indicator ${currentClassName} ${passedClassName}`}>
      {index}
    </div>
  );
};

export default Indicator;
