import { useSelector } from 'react-redux';
import CarouselDesktop from './carousel-desktop/carousel-desktop';
import CarouselPhone from './carousel-phone/carousel-phone';

const Carousel = ({ state, actions }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? (
    <CarouselPhone state={state} {...actions} />
  ) : (
    <CarouselDesktop state={state} {...actions} />
  );
};

export default Carousel;
