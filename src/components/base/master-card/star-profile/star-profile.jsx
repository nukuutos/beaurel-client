import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStarProfile from './use-star-profile';
import useProfileMasterData from './use-profile-master-data';

const StarProfile = ({ masterData = null }) => {
  const data = useProfileMasterData(masterData);
  const [handleClick, isFavorite] = useStarProfile(data);

  return (
    <button type="button" onClick={handleClick} className="profile__star-profile">
      <FontAwesomeIcon className="star-profile star-profile--unstar" icon={['far', 'heart']} />
      <FontAwesomeIcon
        className={`star-profile ${isFavorite ? '' : 'star-profile--invisible'}`}
        icon="heart"
      />
    </button>
  );
};
export default StarProfile;
