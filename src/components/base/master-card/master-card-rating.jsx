import React from 'react';
import useMediaQuery from '../../../hooks/use-media-query';
import decimalFormat from '../../pages/utils/decimal-format';
import Stars from '../stars/stars';

const MasterCardRating = ({ className = '', ratingScore = null }) => {
  const isPhone = useMediaQuery(600);

  return (
    <div className={`master-card__rating ${className}`}>
      <span className="master-card__rating-score mr-1">{decimalFormat(ratingScore)}</span>
      <Stars score={decimalFormat(ratingScore)} starSize={isPhone ? 'small-super' : 'small'} />
    </div>
  );
};

export default MasterCardRating;
