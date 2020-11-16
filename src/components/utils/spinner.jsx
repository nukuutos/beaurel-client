import React from 'react';

const Spinner = ({ className = '' }) => {
  return (
    // <div className="spinner u-flex-align u-full-size">
    <div className={`spinner ${className}`} />
    // </div>
  );
};

export default Spinner;
