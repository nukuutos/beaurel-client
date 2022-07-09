import React from 'react';

import useStarProfile from './use-star-profile';
import useProfileMasterData from './use-profile-master-data';
import Heart from '../../icons/heart';
import FarHeart from '../../icons/far-heart';

const StarProfile = ({ masterData = null }) => {
  const data = useProfileMasterData(masterData);
  const [handleClick, isFavorite] = useStarProfile(data);

  return (
    <button type="button" onClick={handleClick} className="profile__star-profile">
      <FarHeart className="star-profile star-profile--unstar" />
      <Heart className={`star-profile ${isFavorite ? '' : 'star-profile--invisible'}`} />
    </button>
  );
};
export default StarProfile;
