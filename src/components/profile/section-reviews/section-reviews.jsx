import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getReviewsStart } from '../../../redux/reviews/actions';
import OverallReview from './overall-review/overall-review';
import ReviewCard from './review-card';
import Stars from '../../utils/stars/stars';
import axios from '../../../utils/axios';

const SectionReviews = () => {
  const [reviews, setReviews] = useState([
    // {
    //   customer: { firstName: 'Никита', lastName: 'Волошин', avatarImage: 'profile-photo.jpeg' },
    //   date: '12 окт. 2010',
    //   review: {
    //     comment:
    //       'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus porro quisquam similique delectus consectetur soluta labore temporibus eligendi magni molestiae, aspernatur, placeat aut facere, possimus debitis repudiandae corporis doloribus perspiciatis?',
    //     value: 4,
    //   },
    // },
  ]);
  const { ratingStats, id: profileId } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      const {
        data: { reviews },
      } = await axios.get(`/profile/${profileId}/review`);
      setReviews(reviews);
    };

    getReviews();
  }, []);

  return (
    <section className="profile__reviews">
      {ratingStats && <OverallReview className="profile__overall-review" ratingStats={ratingStats} />}

      {reviews.length ? (
        reviews.map((reviewProps, i) => <ReviewCard {...reviewProps} key={i} />)
      ) : (
        <div className="profile__noreview noreview card mt-8">
          <p className="noreview__text mt-9">
            Будь первым, кто оставит свой отзыв! Но для начала тебе нужно побывать на приёме у Мастера, удачи!
          </p>
          <Stars score="5" className={'noreview__stars mt-4 mb-8'} />
        </div>
      )}
    </section>
  );
};

export default SectionReviews;
