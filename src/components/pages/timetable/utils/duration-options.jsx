import React from 'react';
import displayDuration from '../../services/utils/display-duration';

const DurationOptions = ({ duration }) => {
  duration = Number(duration);

  const optionComponents = [];
  const hours24InMins = 1440;

  for (let i = duration; i < hours24InMins; i += duration) {
    optionComponents.push(
      <option value={i} key={i}>
        {displayDuration(i)}
      </option>
    );
  }

  console.log(duration, optionComponents);

  return optionComponents;
};

export default DurationOptions;
