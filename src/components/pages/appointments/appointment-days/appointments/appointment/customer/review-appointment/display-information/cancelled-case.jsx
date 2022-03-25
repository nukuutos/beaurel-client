import React from 'react';

const CancelledCase = ({ user }) =>
  user === 'master' ? (
    <p className="appointment-card__no-review appointment-card__no-review--fail">
      Мастер отменил запись
    </p>
  ) : (
    <p className="appointment-card__no-review appointment-card__no-review--fail">
      Вы отменили запись
    </p>
  );

export default CancelledCase;
