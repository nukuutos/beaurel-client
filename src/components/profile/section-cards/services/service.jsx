import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from './utils/display-duration';

// This component need wrapper (because of reusabilty)
const Service = ({ service, isDraggable = false }) => {
  const { title, duration, price } = service;

  const titleClassName = `service__title ${isDraggable ? 'service__title--draggable' : ''}`;
  const durationClassName = `service__duration ${isDraggable ? 'service__duration--draggable' : ''}`;
  const priceClassName = `service__price ${isDraggable ? 'service__price--draggable' : ''}`;

  return (
    <>
      <span className={titleClassName}>{title}</span>
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

export default Service;
