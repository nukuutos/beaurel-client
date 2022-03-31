import React from 'react';

const DisplayInput = ({ label, data }) => (
  <div className="setting-card__display input--display">
    <label className="label">{label}</label>
    {data}
  </div>
);

export default DisplayInput;
