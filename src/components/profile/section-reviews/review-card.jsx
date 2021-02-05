import React from 'react';
import Stars from '../../utils/stars/stars';
import TextMore from '../../utils/text-more/text-more';

const ReviewCard = ({ review, customer }) => {
  const { comment, value, date } = review;
  const { avatar, firstName, lastName } = customer;

  return (
    <div className="review-card profile__review-card card mt-8">
      <img className="review-card__customer-photo" src={`http://localhost:5000/${avatar}`} alt="Customer photo" />
      <span className="review-card__customer-name mt-1">{firstName + ' ' + lastName[0] + '.'}</span>
      <span className="review-card__date mt-1">{date}</span>
      <Stars score={value} className="review-card__stars mt-1" />
      <TextMore textClassName="review-card__comment" moreClassName="review-card__more mt-4" maxSymbs={15}>
        {comment}
      </TextMore>
    </div>
  );
};

export default ReviewCard;
