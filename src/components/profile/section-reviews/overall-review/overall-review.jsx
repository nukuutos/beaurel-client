import RatingIndicators from './rating-indicators';
import Stars from '../../../utils/stars/stars';
import decimalFormat from '../../utils/decimal-format';

const OverallReview = ({ ratingStats, className }) => {
  const { avgRating, overallReviewsCounter, ratingCounters } = ratingStats;

  return (
    <div className={`overall-review ${className} card mt-8`}>
      <div className="overall-review__result ">
        <span className="overall-review__score">{decimalFormat(avgRating)}</span>
        <Stars score={decimalFormat(avgRating)} className="overall-review__stars mt-2" />
        <span className="overall-review__reviews-count mt-4 ">
          {overallReviewsCounter} отзыв{overallReviewsCounter === 1 ? '' : 'а'}
        </span>
      </div>

      <div className="overall-review__line" />

      <RatingIndicators
        overallRewiesCount={overallReviewsCounter}
        ratingCounters={ratingCounters}
        className="overall-review__rating-indicators"
      />
    </div>
  );
};

export default OverallReview;
