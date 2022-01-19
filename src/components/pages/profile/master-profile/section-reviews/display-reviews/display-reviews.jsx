import React from 'react';
import { useSelector } from 'react-redux';
import OverallReview from './overall-review/overall-review';
import ReviewCard from './review-card';

const DisplayReviews = () => {
  const { reviews } = useSelector((state) => state.profile);

  return (
    <>
      <OverallReview />
      {reviews.map((reviewProps, i) => (
        <ReviewCard {...reviewProps} key={i} />
      ))}
    </>
  );
};

export default DisplayReviews;
