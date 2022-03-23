import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayStars = ({ score, starSize = 'medium' }) => {
  const [int, decimal] = String(score)
    .split('.')
    .map((num) => Number(num));

  const stars = [];

  for (let i = 1; i <= int; i++) {
    stars.push(<FontAwesomeIcon className={`stars__star--${starSize}`} icon="star" key={i} />);
  }

  if (decimal && decimal >= 5) {
    stars.push(<FontAwesomeIcon className={`stars__star--${starSize}`} icon="star-half" key={5} />);
  }

  return stars;
};

export default DisplayStars;
