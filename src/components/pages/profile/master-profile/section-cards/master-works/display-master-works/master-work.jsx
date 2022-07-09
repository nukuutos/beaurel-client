import React from 'react';
import { useSelector } from 'react-redux';

const MasterWork = ({ goToCarousel, work }) => {
  const { id: masterId } = useSelector((state) => state.profile);
  const { _id, title } = work;

  return (
    <figure onClick={goToCarousel} className="master-work">
      <img
        src={`https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/${masterId}/${_id}.webp`}
        alt="Master's work"
        className="master-work__img"
      />
      <figcaption className="master-work__title">{title}</figcaption>
    </figure>
  );
};

export default MasterWork;
