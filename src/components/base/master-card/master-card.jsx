import React from 'react';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StarProfile from './star-profile/star-profile';
import getAvatarPath from '../../pages/utils/get-avatar-path';
import DisplayRating from './display-rating';
import displayPlaceOfWork from '../../pages/utils/display-place-of-work';
import MapMarker from '../icons/map-marker';

const MasterCard = ({ master, className, masterCardRef = null }) => {
  const [{ id: userId }, { isPhone }] = useSelector((state) => [state.auth, state.screenSize]);

  const { firstName, lastName, rating, placeOfWork, isAvatar, specialization, _id } = master;

  const router = useRouter();

  const isFavoriteIcon = userId && userId !== _id && !isPhone;

  const goToProfile = () => router.push('/[id]', `/${_id}`);

  return (
    <div onClick={goToProfile} ref={masterCardRef} className={`${className} master-card card`}>
      <div className="master-card__identity">
        <div className="master-card__avatar">
          <Image
            quality={100}
            layout="fill"
            src={getAvatarPath(_id, isAvatar)}
            alt="Profile avatar"
            className="master-card__image"
            sizes="(max-width: 600px) 60px, (max-width: 900px) 76px, 90px"
          />
        </div>
        <DisplayRating rating={rating} />
      </div>
      <div className="master-card__biography">
        <h1 className="master-card__name">{`${firstName} ${lastName}`}</h1>
        <h2 className="master-card__specialization">{specialization}</h2>
        <div className="master-card__geolocation">
          <MapMarker className="master-card__map-marker" />
          {displayPlaceOfWork(placeOfWork)}
        </div>
      </div>
      {isFavoriteIcon && <StarProfile masterData={master} />}
    </div>
  );
};

export default MasterCard;
