import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ fileName, cardName, captionClassName, onClick }) => {
  return (
    <figure className="profile-card" onClick={onClick}>
      <img src={`/svg/${fileName}`} alt="next" />
      <figcaption className={`profile-card__name ${captionClassName}`}>{cardName}</figcaption>
      <div className="profile-card__arrow">
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </figure>

    // <div className="profile-card" onClick={onClick ? onClick : null}>
    //   <FontAwesomeIcon className="profile-card__icon" icon={icon} />
    //   <span className="profile-card__heading">{name}</span>
    // </div>
  );
};

export default Card;
