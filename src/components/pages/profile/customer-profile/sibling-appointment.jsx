import React from 'react';
import { useSelector } from 'react-redux';
import Appointment from '../../appointments/display-appointments/appointment-days/appointments/appointment/base/appointment';

const SiblingAppointment = () => {
  const { siblingAppointment } = useSelector((state) => state.profile.appointmentsData);

  return siblingAppointment ? (
    <Appointment className="profile__sibling-appointment" appointment={siblingAppointment} />
  ) : (
    <span className="profile__no-appointment">Нет активных записей</span>
  );
};

export default SiblingAppointment;
