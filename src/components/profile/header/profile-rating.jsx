import React from 'react';
import Stars from '../../utils/stars/stars';
import decimalFormat from '../utils/decimal-format';

const ProfileRating = ({ className = '', ratingScore = null }) => {
  return ratingScore ? (
    <div className={`profile__rating ${className}`}>
      <span className="profile__rating-score mr-1">{decimalFormat(ratingScore)}</span>
      <Stars score={ratingScore} starSize="small" />
    </div>
  ) : (
    <div className="profile__rating" />
  );
};

export default ProfileRating;
