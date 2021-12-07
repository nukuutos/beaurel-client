import useMediaQuery from '../../../../../../../hooks/use-media-query';
import Stars from '../../../../../../base/stars/stars';

const RatingIndicator = ({ score, width, reviewsCount }) => {
  const isMobile = useMediaQuery(600);

  return (
    <div className="rating-indicator">
      <div className="rating-indicator__line--base">
        <div className="rating-indicator__line" style={{ width: `${width}%` }} />
      </div>
      <Stars score={score} starSize={isMobile ? 'small-super' : 'small'} />
      <span className="rating-indicator__counter">{reviewsCount}</span>
    </div>
  );
};

export default RatingIndicator;
