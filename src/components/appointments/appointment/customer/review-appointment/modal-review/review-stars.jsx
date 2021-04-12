import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { reversedRating } from './utils';

const ReviewStars = ({ value, starSize, setValue }) => {
  const [isHover, setIsHover] = useState(false);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isActiveClass = !isHover && value === i;

      stars.push(
        <FontAwesomeIcon
          onClick={() => setValue(reversedRating[i])}
          className={`stars__star--${starSize} edit-review__star ${isActiveClass ? 'edit-review__star--active' : ''}`}
          icon="star"
          key={i}
        />
      );
    }

    return stars;
  };

  return (
    <span
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`stars edit-review__stars mt-6`}>
      {renderStars()}
    </span>
  );
};

export default ReviewStars;
