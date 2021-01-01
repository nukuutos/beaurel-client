import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ name, icon, onClick }) => {
  return (
    <div className="profile-card" onClick={onClick ? onClick : null}>
      <FontAwesomeIcon className="profile-card__icon" icon={icon} />
      <span className="profile-card__heading">{name}</span>
    </div>
  );
};

export default Card;
