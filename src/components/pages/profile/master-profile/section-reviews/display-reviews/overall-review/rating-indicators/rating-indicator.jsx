import { useSelector } from 'react-redux';
import Stars from '../../../../../../../base/stars/stars';

const RatingIndicator = ({ score, width, reviewsCount }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const starsClassNameSize = isPhone ? 'stars--small-super' : 'stars--small';

  return (
    <div className="rating-indicator">
      <div className="rating-indicator__line--base">
        <div className="rating-indicator__line" style={{ width: `${width}%` }} />
      </div>
      <Stars score={score} className={starsClassNameSize} />
      <span className="rating-indicator__counter">{reviewsCount}</span>
    </div>
  );
};

export default RatingIndicator;
