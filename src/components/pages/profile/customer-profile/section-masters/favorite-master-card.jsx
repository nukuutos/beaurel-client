import React from 'react';
import Stars from '../../../../base/stars/stars';
import decimalFormat from '../../../utils/decimal-format';
import getAvatarPath from '../../../utils/get-avatar-path';

const FavoriteMasterCard = ({ firstName, lastName, specialization, avatar, rating }) => {
  const name = `${firstName} ${lastName[0]}.`;

  return (
    <div className="favorite-master-card card">
      <img
        src={getAvatarPath(avatar)}
        alt="Favorite master"
        className="favorite-master-card__avatar"
      />
      <span className="favorite-master-card__name">{name}</span>
      <span className="favorite-master-card__specialization">{specialization}</span>
      <Stars
        className="favorite-master-card__stars"
        score={decimalFormat(rating)}
        starSize="small"
      />
    </div>
  );
};

export default FavoriteMasterCard;
