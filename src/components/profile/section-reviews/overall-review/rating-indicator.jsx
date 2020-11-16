import Stars from '../../../utils/stars';

const RatingIndicator = ({ score, width, rewiesCount }) => {
  return (
    <div className="rating-indicator">
      <div className="rating-indicator__line--base">
        <div className="rating-indicator__line" style={{ width: width + '%' }}></div>
      </div>
      <Stars score={score} starSize="small" />
      <span className="rating-indicator__counter">{rewiesCount}</span>
    </div>
  );
};

export default RatingIndicator;
