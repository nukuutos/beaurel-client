import React from 'react';
import Appointment from '../../base/appointment';
import DisplayInformation from './display-information/display-information';

const ReviewAppointment = ({ user, appointment, lastAppointmentRef = null }) => (
  <Appointment
    className="appointments__appointment-card"
    user={user}
    appointment={appointment}
    lastAppointmentRef={lastAppointmentRef}
  >
    <div className="appointment-card__buttons">
      <DisplayInformation appointment={appointment} />
    </div>
  </Appointment>
);

export default ReviewAppointment;
