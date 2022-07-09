import React from 'react';
import displayDuration from '../../utils/display-duration';

const hours24InMins = 1440;

const DurationOptions = ({ duration, startAt = duration, endAt = hours24InMins }) => {
  duration = Number(duration);

  const optionComponents = [];

  for (let i = startAt; i < endAt; i += duration) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayDuration(i)}
      </option>
    );
  }

  return optionComponents;
};

export default DurationOptions;
