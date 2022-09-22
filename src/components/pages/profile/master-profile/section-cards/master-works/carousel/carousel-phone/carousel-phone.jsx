import { useSelector } from 'react-redux';
import Chevrons from '../chevrons';
import useCarouselSwipeable from './use-carousel-swipeable';
import TitleSectionPhone from './title-section-phone';
import useDeleteWork from '../use-delete-work';

const CarouselPhone = ({ state, goToPrevWork, goToNextWork, goToGallery, goToEditWork }) => {
  const [{ id: masterId }, { works }] = useSelector((state) => [state.profile, state.work]);
  const [deleteWork, isDeleting] = useDeleteWork({ state, goToGallery });

  const { index, length } = state;

  const [handlers] = useCarouselSwipeable({ goToPrevWork, goToNextWork });

  const isChevrons = length > 1;

  return (
    <>
      {isDeleting && <div className="spinner-with-background" />}
      <div {...handlers} className="carousel">
        <div className="carousel__main">
          {isChevrons && <Chevrons toNextWork={goToNextWork} toPrevWork={goToPrevWork} />}

          <img
            src={`https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/${masterId}/${works[index]._id}.webp`}
            className="carousel__image"
            alt="Master's work"
          />
        </div>

        <TitleSectionPhone deleteWork={deleteWork} goToEditWork={goToEditWork} state={state} />
      </div>
    </>
  );
};

export default CarouselPhone;
