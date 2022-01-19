import React from 'react';
import { useSelector } from 'react-redux';
import DisplayReviews from './display-reviews/display-reviews';
import NoReviews from './no-reviews';

const SectionReviews = () => {
  const { reviews } = useSelector((state) => state.profile);

  return (
    <section className="profile__reviews">
      {reviews.length ? <DisplayReviews /> : <NoReviews />}
    </section>
  );
};

export default SectionReviews;
