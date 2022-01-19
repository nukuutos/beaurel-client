import useRatingIndicators from './use-rating-indicators';

const RatingIndicators = () => {
  const indicators = useRatingIndicators();
  return <div className="rating-indicators overall-review__rating-indicators">{indicators}</div>;
};
export default RatingIndicators;
