import React, { useState } from 'react';
import Appointment from '../../base/appointment';
import ModalReview from './modal-review/modal-review';

// do we need id comment and date from review ?
const ReviewAppointment = ({ appointment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { review } = appointment;

  const openReviewEditor = () => setIsEditing(true);
  const closeReviewEditor = () => setIsEditing(false);

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        {review ? (
          <div onClick={openReviewEditor} className="btn btn--flat btn--secondary">
            Изменить отзыв
          </div>
        ) : (
          <div onClick={openReviewEditor} className="btn btn--flat btn--primary">
            Оставить отзыв
          </div>
        )}
      </div>

      {isEditing && <ModalReview appointment={appointment} onClickClose={closeReviewEditor} />}
    </Appointment>
  );
};

export default ReviewAppointment;
