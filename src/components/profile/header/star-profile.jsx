import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarProfile = ({ onClick, isStarred }) => {
  return (
    <div onClick={(e) => onClick(e)} className="profile__star-profile">
      <FontAwesomeIcon className="star-profile star-profile--unstar" icon={['far', 'heart']} />
      <FontAwesomeIcon className={`star-profile ${isStarred ? '' : 'star-profile--invisible'}`} icon="heart" />
    </div>
  );
};

export default StarProfile;
