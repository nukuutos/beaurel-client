import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import useStarProfile from './use-star-profile';

const StarProfile = () => {
  const { masters, id } = useSelector((state) => state.profile);
  const [addMaster, deleteMaster] = useStarProfile();

  const isFavorite = masters.includes(id);
  const onClick = isFavorite ? deleteMaster : addMaster;

  return (
    <button type="button" onClick={onClick} className="profile__star-profile">
      <FontAwesomeIcon className="star-profile star-profile--unstar" icon={['far', 'heart']} />
      <FontAwesomeIcon
        className={`star-profile ${isFavorite ? '' : 'star-profile--invisible'}`}
        icon="heart"
      />
    </button>
  );
};
export default StarProfile;
