import { useSelector } from 'react-redux';
import Stars from '../../../../../../../base/stars/stars';

const RatingIndicator = ({ score, width, reviewsCount }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className="rating-indicator">
      <div className="rating-indicator__line--base">
        <div className="rating-indicator__line" style={{ width: `${width}%` }} />
      </div>
      <Stars score={score} starSize={isPhone ? 'small-super' : 'small'} />
      <span className="rating-indicator__counter">{reviewsCount}</span>
    </div>
  );
};

export default RatingIndicator;
