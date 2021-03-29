import React from 'react';

const AppointmentController = () => {
  return (
    <h1 className="appointments__controller appointment-controller card mt-8">
      <span className="appointment-controller__item appointment-controller__item--active">Записи к Вам</span>
      <span>|</span>
      <span className="appointment-controller__item appointment-controller__item">Ваши Записи</span>
    </h1>
  );
};

export default AppointmentController;
