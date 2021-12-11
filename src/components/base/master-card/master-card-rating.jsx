import React from 'react';
import { useSelector } from 'react-redux';
import decimalFormat from '../../pages/utils/decimal-format';
import Stars from '../stars/stars';

const MasterCardRating = ({ className = '', ratingScore = null }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className={`master-card__rating ${className}`}>
      <span className="master-card__rating-score mr-1">{decimalFormat(ratingScore)}</span>
      <Stars score={decimalFormat(ratingScore)} starSize={isPhone ? 'small-super' : 'small'} />
    </div>
  );
};

export default MasterCardRating;
