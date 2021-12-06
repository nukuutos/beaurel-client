import renderStars from './utils';

const Stars = ({ score, starSize, className = null }) => {
  return <span className={`stars ${className ? className : ''}`}>{renderStars(score, starSize)}</span>;
};

export default Stars;
