import React from 'react';
import { useSelector } from 'react-redux';
import { phoneRenderAppointments, renderAppointments } from './utils/render';

const AppointmentsDays = ({ handlers, style, renderArguments = [] }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div {...handlers} style={isPhone ? style : {}} className="appointments__days">
      {isPhone
        ? phoneRenderAppointments(...renderArguments)
        : renderAppointments(...renderArguments)}
    </div>
  );
};

export default AppointmentsDays;
