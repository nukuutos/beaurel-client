import React from 'react';
import { useSelector } from 'react-redux';
import Stars from '../../../base/stars/stars';
import decimalFormat from '../../utils/decimal-format';

const ProfileRating = ({ className = '', ratingScore = null }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return ratingScore ? (
    <div className={`profile__rating ${className}`}>
      <span className="profile__rating-score mr-1">{decimalFormat(ratingScore)}</span>
      <Stars score={decimalFormat(ratingScore)} starSize={isPhone ? 'small-extra' : 'small'} />
    </div>
  ) : (
    <div className="profile__rating" />
  );
};

export default ProfileRating;
