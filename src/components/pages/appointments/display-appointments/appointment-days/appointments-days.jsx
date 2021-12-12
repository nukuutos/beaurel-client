import React from 'react';
import { useSelector } from 'react-redux';
import Appointments from './appointments/appointments';

const AppointmentsDays = ({ handlers, style, state }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const styles = isPhone ? style : {};

  return (
    <div {...handlers} style={styles} className="appointments__days">
      <Appointments {...state} />
    </div>
  );
};

export default AppointmentsDays;
