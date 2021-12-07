import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chevrons from '../chevrons';
import useGoToWork from '../use-go-to-work';
import useCarouselSwipeable from './use-carousel-swipeable';
import TitleSectionPhone from './title-section-phone';

const CarouselPhone = ({ state }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { works } = useSelector((state) => state.work);
  const [{ index }, setState] = state;

  const { toNextWork, toPrevWork } = useGoToWork(setState);

  const [handlers] = useCarouselSwipeable({ toPrevWork, toNextWork });

  const isChevrons = works.length > 1;

  return (
    <>
      {isDeleting && <div className="spinner-with-background" />}
      <div {...handlers} className="carousel">
        <div className="carousel__main">
          {isChevrons && <Chevrons toNextWork={toNextWork} toPrevWork={toPrevWork} />}

          <img
            src={`http://localhost:5000/images/works/${works[index]._id}.png`}
            className="carousel__image"
            alt="Master's work"
          />
        </div>

        <TitleSectionPhone setIsDeleting={setIsDeleting} state={state} />
      </div>
    </>
  );
};

export default CarouselPhone;
