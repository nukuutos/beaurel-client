import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Avatar = ({ image, className = '' }) => {
  return (
    <div className={`avatar ${className}`}>
      <img src={`/img/${image}`} alt="Profile image" className="avatar__image" />
      <div className="avatar__change-image">
        <FontAwesomeIcon className="avatar__pen-icon" icon="pen" />
      </div>
    </div>
  );
};

export default Avatar;
