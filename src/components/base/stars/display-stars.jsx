import Star from '../icons/star';
import StarHalf from '../icons/star-half';

const DisplayStars = ({ score, starSize = 'medium' }) => {
  const [int, decimal] = String(score)
    .split('.')
    .map((num) => Number(num));

  const stars = [];

  for (let i = 1; i <= int; i++) {
    stars.push(<Star className={`stars__star--${starSize}`} key={i} />);
  }

  if (decimal && decimal >= 5) {
    stars.push(<StarHalf className={`stars__star--${starSize}`} key={5} />);
  }

  return stars;
};

export default DisplayStars;
