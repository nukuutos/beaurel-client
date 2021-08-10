import useMediaQuery from '../../../../hooks/use-media-query';
import Stars from '../../../utils/stars/stars';

const RatingIndicator = ({ score, width, rewiesCount }) => {
  const isMobile = useMediaQuery(600);

  return (
    <div className="rating-indicator">
      <div className="rating-indicator__line--base">
        <div className="rating-indicator__line" style={{ width: width + '%' }}></div>
      </div>
      <Stars score={score} starSize={isMobile ? "small-super" : "small"} />
      <span className="rating-indicator__counter">{rewiesCount}</span>
    </div>
  );
};

export default RatingIndicator;
