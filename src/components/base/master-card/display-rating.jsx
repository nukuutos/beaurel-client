import React from 'react';
import MasterCardRating from './master-card-rating';

const DisplayRating = ({ rating }) =>
  rating ? (
    <MasterCardRating className="master-card__rating" ratingScore={rating} />
  ) : (
    <MasterCardRating className="master-card__rating master-card__rating--empty" ratingScore={5} />
  );

export default DisplayRating;
