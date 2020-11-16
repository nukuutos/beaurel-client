import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getReviewsStart } from '../../../redux/reviews/actions';
import OverallReview from './overall-review/overall-review';
import ReviewCard from './review-card';
import Stars from '../../utils/stars';
import axios from '../../../utils/axios';

const SectionReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { ratingStats } = useSelector((state) => state.profile);

  // const dispatch = useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      const {
        data: { reviews },
      } = await axios.get('/profile/5eb849b81c2ccc21306ced34/review');

      setReviews(reviews);
    };

    getReviews();
  }, []);

  return (
    <section className="profile__section-reviews">
      {ratingStats && (
        <>
          <h3 className="profile__heading-tertiary mb-m">Overall Review</h3>
          <OverallReview ratingStats={ratingStats} />
        </>
      )}

      <h3 className="profile__heading-tertiary mb-m mt-h">Reviews</h3>
      {reviews.length ? (
        reviews.map((reviewProps, i) => <ReviewCard {...reviewProps} key={i} />)
      ) : (
        <p className="profile__noreview-text">
          Be the first to leave your review here but firstly you need to book an appointment and visit the Master!
          <br />
          <Stars score="5" starSize="large" className={'profile__noreview-stars'} />
        </p>
      )}
    </section>
  );
};

export default SectionReviews;
