import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stars = ({ score, starSize, className = null }) => {
  // to hook?
  const renderStars = (score) => {
    let [int, decimal] = String(score)
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

  return <span className={`stars ${className ? className : ''}`}>{renderStars(score)}</span>;
};

export default Stars;
