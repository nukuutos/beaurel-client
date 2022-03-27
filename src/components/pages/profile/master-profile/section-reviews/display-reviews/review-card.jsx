import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomerCard from '../../../../../base/customer-card/customer-card';
import Stars from '../../../../../base/stars/stars';
import TextMore from '../../../../../base/text-more/text-more';
import getAvatarPath from '../../../../utils/get-avatar-path';

const ReviewCard = ({ review, customer }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [isCustomerProfile, setIsCustomerProfile] = useState(false);
  const { comment, value, date } = review;
  const { avatar, firstName, lastName, role, username, _id } = customer;

  const router = useRouter();

  const goToMasterProfile = () => router.push('/[id]', `/${username || _id}`);
  const openCustomerCard = () => setIsCustomerProfile(true);
  const closeCustomerCard = () => setIsCustomerProfile(false);

  const handleClick = role === 'master' ? goToMasterProfile : openCustomerCard;

  return (
    <>
      {isCustomerProfile && <CustomerCard user={customer} onClickClose={closeCustomerCard} />}
      <div className="review-card profile__review-card card">
        <img
          onClick={handleClick}
          className="review-card__customer-photo"
          src={getAvatarPath(avatar)}
          alt="Customer"
        />
        <span
          onClick={handleClick}
          className="review-card__customer-name mt-1"
        >{`${firstName} ${lastName[0]}.`}</span>
        <span className="review-card__date">{date}</span>
        <Stars
          starSize={isPhone ? 'small' : 'medium'}
          score={value}
          className="review-card__stars mt-1"
        />
        <TextMore
          textClassName="review-card__comment"
          moreClassName="review-card__more"
          maxSymbs={15}
        >
          {comment}
        </TextMore>
      </div>
    </>
  );
};

export default ReviewCard;
