import React from 'react';
import { useSelector } from 'react-redux';
import Stars from '../../../base/stars/stars';
import decimalFormat from '../../utils/decimal-format';

const ProfileRating = () => {
  const [{ avgRating }, { isPhone }] = useSelector((state) => [
    state.profile.ratingStats,
    state.screenSize,
  ]);

  return avgRating ? (
    <div className="profile__rating">
      <span className="profile__rating-score mr-1">{decimalFormat(avgRating)}</span>
      <Stars score={decimalFormat(avgRating)} starSize={isPhone ? 'small-extra' : 'small'} />
    </div>
  ) : (
    <div className="profile__rating" />
  );
};

export default ProfileRating;
