import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import getAvatarPath from '../../../utils/get-avatar-path';

const DisplayAvatar = ({ setIsEdit }) => {
  const { avatar } = useSelector((state) => state.profile);

  return (
    <div onClick={() => setIsEdit(true)} className="avatar profile__avatar">
      <img src={getAvatarPath(avatar)} alt="Profile" className="avatar__image" />
      <div className="avatar__change-image">
        <FontAwesomeIcon className="avatar__pen-icon" icon="pen" />
      </div>
    </div>
  );
};

export default DisplayAvatar;
