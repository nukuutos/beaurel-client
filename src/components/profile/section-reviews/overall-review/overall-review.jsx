import RatingIndicators from './rating-indicators';
import Stars from '../../../utils/stars/stars';

const decimaFormat = (num) => (Number.isInteger(num) ? num + '.0' : num);

const OverallReview = ({ ratingStats }) => {
  const { avgRating, overallReviewsCounter, ratingCounters } = ratingStats;

  return (
    <div className="overall-review">
      <span className="overall-review__score">{decimaFormat(avgRating)}</span>
      <Stars score={decimaFormat(avgRating)} starSize="large" />

      <span className="overall-review__reviews-count">
        {overallReviewsCounter} review{overallReviewsCounter === 1 ? '' : 's'}
      </span>
      <RatingIndicators
        overallRewiesCount={overallReviewsCounter}
        ratingCounters={ratingCounters}
        className="profile__rating-indicators"
      />
    </div>
  );
};

export default OverallReview;
