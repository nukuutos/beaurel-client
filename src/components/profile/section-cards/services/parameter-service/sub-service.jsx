import React from 'react';
import displayDuration from '../utils/display-duration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component needs wrapper for reusability
const SubService = ({ subService, isLastService = false, isDraggable = false }) => {
  const { parameter, duration, price } = subService;

  const parameterClassName = `service__parameter ${isDraggable ? 'service__parameter--draggable' : ''} ${
    isLastService ? 'service__parameter--last' : ''
  }`;

  const durationClassName = `service__duration ${isDraggable ? 'service__duration--draggable' : ''}`;

  // check why we need last price class
  const priceClassName = `service__price ${isDraggable ? 'service__price--draggable' : ''} service__price--parameter ${
    isLastService ? 'service__price--last' : ''
  }`;

  return (
    <>
      <span className={parameterClassName}>{parameter}</span>
      <span className={durationClassName}>
        {displayDuration(duration)}
        <FontAwesomeIcon className="service__icon--display ml-s-1" icon={['fas', 'clock']} />
      </span>
      <span className={priceClassName}>
        {price}
        <FontAwesomeIcon className="service__icon--display" icon="ruble-sign" />
      </span>
    </>
  );
};

export default SubService;
