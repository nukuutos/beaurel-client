import React from 'react';

const Line = ({ isPassed }) => {
  const passedClassName = isPassed ? 'progress__line--passed' : '';
  return <div className={`progress__line ${passedClassName}`} />;
};

export default Line;
