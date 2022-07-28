import React, { useState } from 'react';
import Appointment from '../../base/appointment';
import DisplayInformation from './display-information/display-information';
import ModalReview from './modal-review/modal-review';

const ReviewAppointment = ({ user, appointment, lastAppointmentRef = null }) => {
  const [isEditing, setIsEditing] = useState(false);

  const closeReviewEditor = () => setIsEditing(false);
  const openReviewEditor = () => setIsEditing(true);

  return (
    <Appointment
      className="appointments__appointment-card"
      user={user}
      appointment={appointment}
      lastAppointmentRef={lastAppointmentRef}
    >
      {isEditing && <ModalReview appointment={appointment} onClickClose={closeReviewEditor} />}

      <div className="appointment-card__buttons">
        <DisplayInformation openReviewEditor={openReviewEditor} appointment={appointment} />
      </div>
    </Appointment>
  );
};

export default ReviewAppointment;
