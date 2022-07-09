import React from 'react';

import displayDuration from '../../../utils/display-duration';
import Ruble from '../../../../base/icons/ruble';
import Time from '../../../../base/icons/time.';

// Component needs wrapper for reusability
const SubService = ({ subService }) => {
  const { parameter, duration, price } = subService;

  const parameterClassName = `service__title service-parameter__parameter`;

  const durationClassName = `service__group mt-1 ml-8`;

  const priceClassName = `service__group mt-5 ml-8`;

  return (
    <>
      <span className="service__side service__side--left">
        <span className="label">Параметр</span>
        <span className={parameterClassName}>{parameter}</span>
      </span>

      <span className="service__side service__side--right">
        <span className={durationClassName}>
          <Time />
          {displayDuration(duration)}
        </span>
        <div className="service__horizontal-line" />
        <span className={priceClassName}>
          <Ruble />
          {price}
        </span>
      </span>
    </>
  );
};

export default SubService;
