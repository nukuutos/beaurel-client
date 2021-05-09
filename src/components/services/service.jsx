import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from './utils/display-duration';

// This component need wrapper (for reusabilty)
const Service = ({ service }) => {
  const { title, duration, price } = service;

  const titleClassName = `service__title`;

  const durationClassName = `service__duration service__group mt-1 ml-8`;

  const priceClassName = `service__price service__group mt-5 ml-8`;

  return (
    <>
      <div className={`service__side service__side--left`}>
        <span className="label">Название</span>
        <span className={titleClassName}>{title}</span>
      </div>

      <div className="service__side service__side--right">
        <span className={durationClassName}>
          <FontAwesomeIcon icon={['fas', 'clock']} />
          {displayDuration(duration)}
        </span>
        <span className={priceClassName}>
          <FontAwesomeIcon icon="ruble-sign" />
          {price}
        </span>
      </div>
    </>
  );
};

export default Service;
