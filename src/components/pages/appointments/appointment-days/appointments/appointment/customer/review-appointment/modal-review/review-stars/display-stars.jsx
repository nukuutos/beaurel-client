import React from 'react';
import Star from '../../../../../../../../../base/icons/star';
import reversedRating from '../utils/reversed-rating';
import getStarClassName from './get-star-class-name';

const DisplayStars = ({ isHover, value, starSize, setValue }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isActiveStar = !isHover && value === i;
    const className = getStarClassName(starSize, isActiveStar);
    const handleClick = () => setValue(reversedRating[i]);

    stars.push(<Star onClick={handleClick} className={className} key={i} />);
  }

  return stars;
};

export default DisplayStars;
