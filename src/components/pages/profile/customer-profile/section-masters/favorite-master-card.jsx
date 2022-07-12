import Image from 'next/image';
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
  isAvatar,
  rating,
}) => {
  const router = useRouter();
  const name = `${firstName} ${lastName[0]}.`;

  const goToMaster = () => router.push('/[id]', `/${username || _id}`);

  return (
    <div onClick={goToMaster} className="favorite-master-card card">
      <div className="favorite-master-card__avatar">
        <Image
          quality={100}
          layout="fill"
          src={getAvatarPath(_id, isAvatar)}
          alt="Profile avatar"
          className="favorite-master-card__image"
          sizes="72px"
        />
      </div>
      <span className="favorite-master-card__name">{name}</span>
      <span className="favorite-master-card__specialization">{specialization}</span>
      <Stars className="favorite-master-card__stars stars--small" score={decimalFormat(rating)} />
    </div>
  );
};

export default FavoriteMasterCard;
