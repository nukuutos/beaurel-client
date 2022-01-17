import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStarProfile from './use-star-profile';

const StarProfile = ({ masterData }) => {
  const [handleClick, isFavorite] = useStarProfile(masterData);

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
