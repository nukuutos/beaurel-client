import DisplayStars from './display-stars';

const Stars = ({ score, starSize, className = null }) => (
  <span className={`stars ${className || ''}`}>
    <DisplayStars score={score} starSize={starSize} />
  </span>
);

export default Stars;
