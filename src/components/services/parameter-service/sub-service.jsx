import React from 'react';
import displayDuration from '../utils/display-duration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component needs wrapper for reusability
const SubService = ({ subService, isLastService = false, isDraggable = false }) => {
  const { parameter, duration, price } = subService;

  const parameterClassName = `service__title ${isDraggable ? 'service__title--draggable' : ''} ${
    isLastService ? 'service__parameter--last' : ''
  }`;

  const durationClassName = `service__duration service__attribute mb-3 ${
    isDraggable ? 'service__duration--draggable' : ''
  }`;

  // check why we need last price class
  const priceClassName = `service__price service__attribute mt-3 ${
    isDraggable ? 'service__price--draggable' : ''
  } service__price--parameter ${isLastService ? 'service__price--last' : ''}`;

  return (
    <>
      <span className={parameterClassName}>{parameter}</span>
      <span className={durationClassName}>
        <FontAwesomeIcon icon={['fas', 'clock']} />
        {displayDuration(duration)}
      </span>
      <div className="service__horizontal-line" />
      <span className={priceClassName}>
        <FontAwesomeIcon icon="ruble-sign" />
        {price}
      </span>
    </>
  );
};

export default SubService;
