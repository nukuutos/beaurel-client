import { useState } from 'react';
import DisplayStars from './display-stars';

const ReviewStars = ({ value, starSize, setValue }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="stars edit-review__stars"
    >
      <DisplayStars isHover={isHover} value={value} starSize={starSize} setValue={setValue} />
    </span>
  );
};

export default ReviewStars;
