import React from 'react';
import { useSelector } from 'react-redux';

import RatingIndicator from './rating-indicator';

const useRatingIndicators = () => {
  const { ratingStats } = useSelector((state) => state.profile);
  const { reviewsCount, ratingCounters } = ratingStats;

  const indicators = [];

  const indicatorValues = ratingCounters.map(({ value }) => value);

  for (let i = 5; i > 0; i--) {
    const index = indicatorValues.indexOf(i);

    const indicatorReviewsCount = ratingCounters[index]?.counter || 0;
    const widthPercentage = Math.round((indicatorReviewsCount * 100) / reviewsCount);

    indicators.push(
      <RatingIndicator
        score={i}
        width={widthPercentage}
        reviewsCount={indicatorReviewsCount}
        key={i}
      />
    );
  }

  return indicators;
};

export default useRatingIndicators;
