import React, { useState } from 'react';
import Appointment from '../../appointment';
import ModalReview from './modal-review/modal-review';

const ReviewAppointment = ({ appointment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { review } = appointment; // do we need id comment and date from review ?

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        {review ? (
          <div onClick={() => setIsEditing(true)} className={`btn btn--flat btn--secondary`}>
            Изменить отзыв
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)} className={`btn btn--flat btn--primary`}>
            Оставить отзыв
          </div>
        )}
      </div>

      {isEditing && <ModalReview appointment={appointment} onClickClose={() => setIsEditing(false)} />}
    </Appointment>
  );
};

export default ReviewAppointment;
