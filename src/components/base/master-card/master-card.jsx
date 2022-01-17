import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import StarProfile from './star-profile/star-profile';
import getAvatarPath from '../../pages/utils/get-avatar-path';
import renderRating from './render-rating';

const MasterCard = ({ master, className, masterCardRef = null }) => {
  const { id: userId } = useSelector((state) => state.auth);

  const { firstName, lastName, rating, placeOfWork, avatar, specialization, _id } = master;

  const router = useRouter();

  const isFavoriteIcon = userId && userId !== _id;

  const goToProfile = () => router.push('/[id]', `/${_id}`);

  return (
    <div onClick={goToProfile} ref={masterCardRef} className={`${className} master-card card`}>
      <div className="master-card__identify">
        <img src={getAvatarPath(avatar)} alt="Profile avatar" className="master-card__avatar" />
        {renderRating(rating)}
      </div>
      <div className="master-card__biography">
        <h1 className="master-card__name">{`${firstName} ${lastName}`}</h1>
        <h2 className="master-card__specialization">{specialization}</h2>
        <div className="master-card__geolocation mt-3">
          <FontAwesomeIcon className="master-card__map-marker" icon="map-marker-alt" />
          {placeOfWork}
        </div>
      </div>
      {isFavoriteIcon && <StarProfile masterData={master} />}
    </div>
  );
};

export default MasterCard;
