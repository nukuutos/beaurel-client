import React from 'react';

import RatingIndicator from './rating-indicator';

const RatingIndicators = ({ overallRewiesCount, ratingCounters, className = '' }) => {
  const renderRatingIndicators = (overallRewiesCount, ratingCounters) => {
    const indicators = [];

    for (let i = 4; i >= 0; i--) {
      const index = ratingCounters.map(({ value }) => value).indexOf(i + 1);

      const { value, counter } = ratingCounters[index] || { value: i + 1, counter: 0 };
      const persantageCountByRatingCount = Math.round((counter * 100) / overallRewiesCount);

      indicators.push(
        <RatingIndicator score={i + 1} width={persantageCountByRatingCount} rewiesCount={counter} key={i} />
      );
    }

    return indicators;
  };

  return (
    <div className={`rating-indicators ${className}`}>{renderRatingIndicators(overallRewiesCount, ratingCounters)}</div>
  );
};

export default RatingIndicators;
