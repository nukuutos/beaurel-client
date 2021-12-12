import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import reversedRating from '../utils/reversed-rating';
import getStarClassName from './get-star-class-name';

const ReviewStars = ({ value, starSize, setValue }) => {
  const [isHover, setIsHover] = useState(false);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isActiveStar = !isHover && value === i;
      const className = getStarClassName(starSize, isActiveStar);
      const handleClick = () => setValue(reversedRating[i]);

      stars.push(
        <FontAwesomeIcon onClick={handleClick} className={className} icon="star" key={i} />
      );
    }

    return stars;
  };

  return (
    <span
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="stars edit-review__stars"
    >
      {renderStars()}
    </span>
  );
};

export default ReviewStars;
