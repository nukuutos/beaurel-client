import React from 'react';
import { useSelector } from 'react-redux';
import AppointmentsDays from './appointment-days/appointments-days';
import AppointmentsDots from './appointment-dots/appointments-dots';
import useCarousel from './use-carousel/use-carousel';

const DisplayAppointments = ({ state }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [active, handlers, styles, direction] = useCarousel(state);

  return (
    <>
      {isPhone && <AppointmentsDots {...state} active={active} direction={direction} />}
      <AppointmentsDays style={styles} handlers={handlers} state={state} />
    </>
  );
};

export default DisplayAppointments;
