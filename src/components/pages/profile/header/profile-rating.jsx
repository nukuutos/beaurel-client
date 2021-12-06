import React from 'react';
import useMediaQuery from '../../../../hooks/use-media-query';
import Stars from '../../../base/stars/stars';
import decimalFormat from '../utils/decimal-format';

const ProfileRating = ({ className = '', ratingScore = null }) => {
  const isPhone = useMediaQuery(600);

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
