import React from 'react';
import Appointment from '../base/appointment';
import Stars from '../../../../../../../base/stars/stars';

const ReviewAppointment = ({ appointment }) => {
  const { review } = appointment; // do we need id comment and date from review ?

  return (
    <Appointment appointment={appointment}>
      <div className="appointment-card__buttons">
        {review ? (
          <Stars score={review.value} className="review-card__stars" />
        ) : (
          <p className="appointment-card__no-review">Нет отзыва</p>
        )}
      </div>
    </Appointment>
  );
};

export default ReviewAppointment;
