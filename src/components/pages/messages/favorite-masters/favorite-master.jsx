import React from 'react';
import getAvatarPath from '../../utils/get-avatar-path';

const FavoriteMaster = ({ master, onClickClose, setActiveDialog }) => {
  const { avatar, firstName, lastName, specialization, _id } = master;
  const displayName = `${firstName} ${lastName[0].toUpperCase()}`;
  const avatarUrl = getAvatarPath(avatar);

  const handleClick = () => {
    setActiveDialog({
      interlocutorId: _id,
      user: { avatar, firstName, lastName, specialization },
    });
    onClickClose();
  };

  return (
    <div onClick={handleClick} className="favorite-master">
      <img src={avatarUrl} alt="User" className="favorite-master__avatar" />
      <div className="favorite-master__group">
        <h3 className="favorite-master__name">{displayName}</h3>
        <span className="favorite-master__status">{specialization}</span>
      </div>
    </div>
  );
};

export default FavoriteMaster;
