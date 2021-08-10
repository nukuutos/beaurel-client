import React from "react";
import useMediaQuery from "../../../hooks/use-media-query";
import Stars from "../../utils/stars/stars";
import TextMore from "../../utils/text-more/text-more";

const getAvatarPath = (avatar) => {
  const avatarPath = `http://localhost:5000/${avatar}`;
  const defaultPath = "/svg/default.svg";

  return avatar ? avatarPath : defaultPath;
};

const ReviewCard = ({ review, customer }) => {
  const isPhone = useMediaQuery(600);
  const { comment, value, date } = review;
  const { avatar, firstName, lastName } = customer;

  return (
    <div className="review-card profile__review-card card">
      <img className="review-card__customer-photo" src={getAvatarPath(avatar)} alt="Customer photo" />
      <span className="review-card__customer-name mt-1">{firstName + " " + lastName[0] + "."}</span>
      <span className="review-card__date mt-1">{date}</span>
      <Stars starSize={isPhone ? "small" : "medium"} score={value} className="review-card__stars mt-1" />
      <TextMore textClassName="review-card__comment" moreClassName="review-card__more" maxSymbs={15}>
        {comment}
      </TextMore>
    </div>
  );
};

export default ReviewCard;
