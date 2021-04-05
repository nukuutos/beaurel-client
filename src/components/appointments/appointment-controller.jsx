import React from 'react';

const AppointmentController = ({ userState }) => {
  const [user, setState] = userState;

  return (
    <h1 className="appointments__controller appointment-controller card mt-8">
      <span
        onClick={() => setState((state) => ({ ...state, user: 'master' }))}
        className={`appointment-controller__item ${user === 'master' ? 'appointment-controller__item--active' : ''}`}>
        Записи к Вам
      </span>
      <span>|</span>
      <span
        onClick={() => setState((state) => ({ ...state, user: 'customer' }))}
        className={`appointment-controller__item ${user === 'customer' ? 'appointment-controller__item--active' : ''}`}>
        Ваши Записи
      </span>
    </h1>
  );
};

export default AppointmentController;
