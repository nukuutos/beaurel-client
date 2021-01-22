import React from 'react';
import Stars from '../../utils/stars/stars';
import DisplayRating from './utils/display-rating';

const ProfileRating = ({ className = '', ratingScore = null }) => {
  return ratingScore ? (
    <div className={`profile__rating ${className}`}>
      <span className="profile__rating-score mr-1">{DisplayRating(ratingScore)}</span>
      <Stars score={ratingScore} starSize="small" />
    </div>
  ) : (
    <div className="profile__rating" />
  );
};

export default ProfileRating;
