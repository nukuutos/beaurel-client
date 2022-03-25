import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import reversedRating from '../utils/reversed-rating';
import getStarClassName from './get-star-class-name';

const DisplayStars = ({ isHover, value, starSize, setValue }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isActiveStar = !isHover && value === i;
    const className = getStarClassName(starSize, isActiveStar);
    const handleClick = () => setValue(reversedRating[i]);

    stars.push(<FontAwesomeIcon onClick={handleClick} className={className} icon="star" key={i} />);
  }

  return stars;
};

export default DisplayStars;
