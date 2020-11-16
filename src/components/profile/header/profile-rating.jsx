import React from 'react';
import Stars from '../../utils/stars';

const ProfileRating = ({ ratingScore = null }) => {
  return ratingScore ? (
    <div className="profile__rating">
      <span className="profile__rating-score">{Number.isInteger(ratingScore) ? ratingScore + '.0' : ratingScore}</span>
      <Stars score={ratingScore} starSize="small" />
    </div>
  ) : (
    <div className="profile__rating"></div>
  );
};

export default ProfileRating;
