import { useRouter } from 'next/router';
import React from 'react';
import Stars from '../../../../base/stars/stars';
import decimalFormat from '../../../utils/decimal-format';
import getAvatarPath from '../../../utils/get-avatar-path';

const FavoriteMasterCard = ({
  _id,
  username,
  firstName,
  lastName,
  specialization,
  avatar,
  rating,
}) => {
  const router = useRouter();
  const name = `${firstName} ${lastName[0]}.`;

  const goToMaster = () => router.push('/[id]', `/${username || _id}`);

  return (
    <div onClick={goToMaster} className="favorite-master-card card">
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
