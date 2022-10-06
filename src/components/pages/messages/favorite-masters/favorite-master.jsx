import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveInterlocutor } from '../../../../redux/slices/messages';
import getAvatarPath from '../../utils/get-avatar-path';

const FavoriteMaster = ({ refToLoadData, master, onClickClose }) => {
  const dispatch = useDispatch();
  const { isAvatar, firstName, lastName, specialization, _id } = master;
  const displayName = `${firstName} ${lastName[0].toUpperCase()}`;
  const avatarUrl = getAvatarPath(_id, isAvatar);

  const handleClick = () => {
    dispatch(
      setActiveInterlocutor({
        _id,
        isAvatar,
        firstName,
        lastName,
        specialization,
      })
    );

    onClickClose();
  };

  return (
    <div ref={refToLoadData} onClick={handleClick} className="favorite-master">
      <img src={avatarUrl} alt="User" className="favorite-master__avatar" />
      <div className="favorite-master__group">
        <h3 className="favorite-master__name">{displayName}</h3>
        <span className="favorite-master__status">{specialization}</span>
      </div>
    </div>
  );
};

export default FavoriteMaster;
