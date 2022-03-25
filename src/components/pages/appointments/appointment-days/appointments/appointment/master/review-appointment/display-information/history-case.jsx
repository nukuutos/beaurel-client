import React from 'react';
import Stars from '../../../../../../../../base/stars/stars';

const HistoryCase = ({ review }) =>
  review ? (
    <Stars score={review.value} className="review-card__stars" />
  ) : (
    <p className="appointment-card__no-review">Нет отзыва</p>
  );

export default HistoryCase;
