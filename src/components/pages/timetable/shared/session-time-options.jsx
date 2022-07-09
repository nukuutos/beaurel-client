import React from 'react';

const SessionTimeOptions = () => {
  const options = [];

  for (let i = 30; i <= 120; i += 30) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return options;
};

export default SessionTimeOptions;
