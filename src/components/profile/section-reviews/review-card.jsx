import React from 'react';
import Stars from '../../utils/stars';
import TextMore from '../../utils/text-more/text-more';

const ReviewCard = ({ review, customer }) => {
  const { comment, value } = review;
  const { avatarImage, firstName, lastName } = customer;

  return (
    <div className="review-card">
      <img className="review-card__customer-photo" src={'/img/' + avatarImage} alt="Customer rating" />
      <span className="review-card__customer-name">{firstName + ' ' + lastName[0] + '.'}</span>
      <Stars score={value} starSize="medium" className="review-card__stars" />
      <TextMore className="review-card__comment" maxSymbs={15}>
        {comment}
      </TextMore>
    </div>
  );
};

export default ReviewCard;
