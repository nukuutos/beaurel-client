import React from 'react';

const Card = ({ fileName, onClick }) => (
  <figure className="profile-card" onClick={onClick}>
    <img src={`/svg/${fileName}`} alt="next" />
  </figure>
);

export default Card;
