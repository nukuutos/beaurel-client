import Image from 'next/image';
import React from 'react';

const Card = ({ fileName, onClick }) => (
  // <img className="profile-card" onClick={onClick} src={`/svg/${fileName}`} alt="next" />
  <div className="profile-card">
    <Image priority layout="fill" onClick={onClick} src={`/svg/${fileName}`} alt="next" />
  </div>
);

export default Card;
