import React from 'react';

const NoAppointments = () => (
  <div className="appointments__no-appointments no-appointments card mt-8">
    <img className="no-appointments__svg" alt="No master works" src="/svg/no-appointments.svg" />
    <p className="no-appointments__text">Записи отсутствуют</p>
  </div>
);

export default NoAppointments;
