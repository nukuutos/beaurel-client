import React from 'react';

const WeekButton = ({ children, onClick }) => {
  return (
    <div className="week__button" onClick={onClick}>
      {children}
    </div>
  );
};

export default WeekButton;
