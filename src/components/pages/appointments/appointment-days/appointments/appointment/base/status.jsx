import React from 'react';

const statuses = { confirmed: 'подтверждено', onConfirmation: 'на подтвердении' };

const Status = ({ statusData }) => {
  const { status } = statusData;
  const confirmedClassName = status === 'confirmed' ? 'appointment-card__status--confirmed' : '';
  return (
    <span className={`appointment-card__status ${confirmedClassName}`}>{statuses[status]}</span>
  );
};

export default Status;
