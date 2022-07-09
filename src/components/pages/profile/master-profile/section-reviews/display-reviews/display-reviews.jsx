import React from 'react';
import { useSelector } from 'react-redux';
import OverallReview from './overall-review/overall-review';
import ReviewCard from './review-card';
import useGetReviews from './use-get-reviews';

const DisplayReviews = () => {
  const { reviews } = useSelector((state) => state.profile);
  const [reviewRef] = useGetReviews();

  return (
    <>
      <OverallReview />
      {reviews.map((reviewProps, i) => {
        const isReviewToFetch = reviews.length - 3 === i;
        if (isReviewToFetch) return <ReviewCard refToFetch={reviewRef} {...reviewProps} key={i} />;
        return <ReviewCard {...reviewProps} key={i} />;
      })}
    </>
  );
};

export default DisplayReviews;
