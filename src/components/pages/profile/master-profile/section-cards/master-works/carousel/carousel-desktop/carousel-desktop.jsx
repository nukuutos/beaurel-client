import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chevrons from '../chevrons';
import useCarouselKeys from './use-carousel-keys';
import useGoToWork from '../use-go-to-work';
import Sidenav from '../sidenav';

const CarouselDesktop = ({ state }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [{ works, masterId }, { id: userId }, { isPhone }] = useSelector((state) => [
    state.work,
    state.auth,
    state.screenSize,
  ]);
  const [{ index }, setState] = state;

  const { toNextWork, toPrevWork } = useGoToWork(setState);

  useCarouselKeys({ toNextWork, toPrevWork });

  const isChevrons = !isPhone && works.length > 1;
  const isOwner = userId === masterId;

  return (
    <div className="carousel">
      {isDeleting && <div className="spinner-with-background" />}

      {isChevrons && <Chevrons toNextWork={toNextWork} toPrevWork={toPrevWork} />}

      <div className="carousel__main">
        {isOwner && (
          <Sidenav className="carousel__sidenav" setIsDeleting={setIsDeleting} state={state} />
        )}

        <img
          src={`https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/${masterId}/${works[index]._id}.webp`}
          className="carousel__image"
          alt="Master's work"
        />
        <figcaption className="carousel__title">{works[index].title}</figcaption>
      </div>
    </div>
  );
};

export default CarouselDesktop;
