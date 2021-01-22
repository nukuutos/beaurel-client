import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarProfile = ({ initialIsStarred }) => {
  const [isStarred, setIsStarred] = useState(initialIsStarred);

  return (
    <div className="profile__star-profile">
      <FontAwesomeIcon className="star-profile star-profile--unstar" icon={['far', 'heart']} />
      <FontAwesomeIcon
        className={`star-profile ${isStarred ? '' : 'star-profile--invisible'}`}
        icon="heart"
        onClick={() => setIsStarred(!isStarred)}
      />
    </div>
  );
};

export default StarProfile;
