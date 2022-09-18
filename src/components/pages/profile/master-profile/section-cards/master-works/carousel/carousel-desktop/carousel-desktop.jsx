import { useSelector } from 'react-redux';
import Chevrons from '../chevrons';
import useCarouselKeys from './use-carousel-keys';
import Sidenav from '../sidenav';
import useDeleteWork from '../use-delete-work';

const CarouselDesktop = ({ state, goToNextWork, goToPrevWork, goToGallery, goToEditWork }) => {
  const [{ works, masterId }, { id: userId }, { isPhone }] = useSelector((state) => [
    state.work,
    state.auth,
    state.screenSize,
  ]);

  const { index, length } = state;

  const isChevrons = !isPhone && length > 1;
  const isOwner = userId === masterId;

  useCarouselKeys({ goToNextWork, goToPrevWork, isChevrons });

  const [deleteWork, isDeleting] = useDeleteWork({ state, goToGallery });

  return (
    <div className="carousel">
      {isDeleting && <div className="spinner-with-background" />}

      {isChevrons && <Chevrons toNextWork={goToNextWork} toPrevWork={goToPrevWork} />}

      <div className="carousel__main">
        {isOwner && (
          <Sidenav
            className="carousel__sidenav"
            deleteWork={deleteWork}
            goToEditWork={goToEditWork}
          />
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
