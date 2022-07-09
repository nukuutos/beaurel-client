import { useSelector } from 'react-redux';
import RatingIndicators from './rating-indicators/rating-indicators';
import Stars from '../../../../../../base/stars/stars';
import decimalFormat from '../../../../../utils/decimal-format';
import getWordReview from './get-word-review';

const OverallReview = () => {
  const [{ ratingStats }, { isPhone }] = useSelector((state) => [state.profile, state.screenSize]);
  const { avgRating, reviewsCount } = ratingStats;
  const starsClassNameSize = isPhone ? 'stars--small-big' : 'stars--medium';

  return (
    <div className="overall-review profile__overall-review card mt-8">
      <div className="overall-review__result">
        <span className="overall-review__score">{decimalFormat(avgRating)}</span>
        <Stars
          score={decimalFormat(avgRating)}
          className={`overall-review__stars ${starsClassNameSize} mt-2`}
        />
        <span className="overall-review__reviews-count mt-4 ">
          {reviewsCount} {getWordReview(reviewsCount)}
        </span>
      </div>

      <div className="overall-review__line" />

      <RatingIndicators />
    </div>
  );
};

export default OverallReview;
