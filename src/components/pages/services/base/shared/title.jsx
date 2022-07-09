import React from 'react';

const Title = ({ children, className }) => (
  <div className="service__side service__side--left">
    <span className="label">Название</span>
    <span className={className}>{children}</span>
  </div>
);

export default Title;
