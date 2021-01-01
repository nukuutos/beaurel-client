import renderStars from './utils';

const Stars = ({ score, starSize, className = null }) => {
  // to hook?

  return <span className={`stars ${className ? className : ''}`}>{renderStars(score, starSize)}</span>;
};

export default Stars;
