import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from './utils/display-duration';

// This component need wrapper (because of reusabilty)
const Service = ({ service, isDraggable = false }) => {
  const { title, duration, price } = service;

  const titleClassName = `service__title ${isDraggable ? 'service__title--draggable' : ''}`;
  const durationClassName = `service__duration service__attribute mb-3 ${
    isDraggable ? 'service__duration--draggable' : ''
  }`;
  const priceClassName = `service__price service__attribute mt-3 ${isDraggable ? 'service__price--draggable' : ''}`;

  return (
    <>
      <span className={titleClassName}>{title}</span>
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

export default Service;
