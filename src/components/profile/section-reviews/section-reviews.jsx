import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OverallReview from "./overall-review/overall-review";
import ReviewCard from "./review-card";
import Stars from "../../utils/stars/stars";
import { setAlert } from "../../../redux/alert/actions";

const SectionReviews = () => {
  const { ratingStats, reviews } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <section onClick={() => dispatch(setAlert({ type: "success", message: "Wau" }))} className="profile__reviews">
      {ratingStats && <OverallReview className="profile__overall-review" ratingStats={ratingStats} />}

      {reviews.length ? (
        reviews.map((reviewProps, i) => <ReviewCard {...reviewProps} key={i} />)
      ) : (
        <div className="profile__noreview noreview card mt-8">
          <p className="noreview__text mt-9">
            Будь первым, кто оставит свой отзыв! Но для начала тебе нужно побывать на приёме у Мастера, удачи!
          </p>
          <Stars score="5" className={"noreview__stars mt-4 mb-8"} />
        </div>
      )}
    </section>
  );
};

export default SectionReviews;
