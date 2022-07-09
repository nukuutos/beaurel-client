import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Stars from '../../../../../base/stars/stars';
import TextMore from '../../../../../base/text-more/text-more';
import ModalFallback from '../../../../shared/modal-fallback';
import getAvatarPath from '../../../../utils/get-avatar-path';

const CustomerCard = dynamic(() => import('../../../../../base/customer-card/customer-card'), {
  loading: () => <ModalFallback />,
});

const ReviewCard = ({ review, customer, refToFetch }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [isCustomerProfile, setIsCustomerProfile] = useState(false);
  const { comment, value, date } = review;
  const { isAvatar, firstName, lastName, role, username, _id } = customer;

  const router = useRouter();

  const goToMasterProfile = () => router.push('/[id]', `/${username || _id}`);
  const openCustomerCard = () => setIsCustomerProfile(true);
  const closeCustomerCard = () => setIsCustomerProfile(false);

  const handleClick = role === 'master' ? goToMasterProfile : openCustomerCard;

  const starsClassNameSize = isPhone ? 'stars--small-extra' : 'stars--small';

  return (
    <>
      {isCustomerProfile && <CustomerCard user={customer} onClickClose={closeCustomerCard} />}
      <div ref={refToFetch} className="review-card profile__review-card card">
        <div className="review-card__customer-photo">
          <Image
            layout="fill"
            objectFit="contain"
            onClick={handleClick}
            className="review-card__image"
            src={getAvatarPath(_id, isAvatar)}
            alt="Customer"
            sizes="(max-width: 600px) 44px, 68px"
          />
        </div>
        <span
          onClick={handleClick}
          className="review-card__customer-name mt-1"
        >{`${firstName} ${lastName[0]}.`}</span>
        <span className="review-card__date">{date}</span>
        <Stars score={value} className={`review-card__stars ${starsClassNameSize} mt-1`} />
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
