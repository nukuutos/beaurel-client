import React from 'react';
import Appointments from './appointments/appointments';

const AppointmentsDays = ({ state, isLoading }) => (
  <div className="appointments__days">
    {isLoading && <div className="appointments__spinner spinner" />}
    <Appointments {...state} />
  </div>
);

export default AppointmentsDays;
