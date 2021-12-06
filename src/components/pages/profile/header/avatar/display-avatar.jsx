import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const getAvatarPath = (avatar) => {
  const avatarPath = `http://localhost:5000/${avatar}`;
  const defaultPath = '/svg/default.svg';

  return avatar ? avatarPath : defaultPath;
};

const DisplayAvatar = ({ setIsEdit, className = '' }) => {
  const { avatar } = useSelector((state) => state.profile);

  return (
    <div onClick={() => setIsEdit(true)} className={`avatar ${className}`}>
      <img src={getAvatarPath(avatar)} alt="Profile" className="avatar__image" />
      <div className="avatar__change-image">
        <FontAwesomeIcon className="avatar__pen-icon" icon="pen" />
      </div>
    </div>
  );
};

export default DisplayAvatar;
