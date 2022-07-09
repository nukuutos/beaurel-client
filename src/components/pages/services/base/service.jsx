import React from 'react';

import Title from './shared/title';
import displayDuration from '../../utils/display-duration';
import Ruble from '../../../base/icons/ruble';
import Time from '../../../base/icons/time.';

const Service = ({ service }) => {
  const { title, duration, price } = service;

  const titleClassName = `service__title`;

  const durationClassName = `service__duration service__group mt-1 ml-8`;

  const priceClassName = `service__price service__group mt-5 ml-8`;

  return (
    <>
      <Title className={titleClassName}>{title}</Title>

      <div className="service__side service__side--right">
        <span className={durationClassName}>
          <Time />
          {displayDuration(duration)}
        </span>
        <span className={priceClassName}>
          <Ruble />
          {price}
        </span>
      </div>
    </>
  );
};

export default Service;
