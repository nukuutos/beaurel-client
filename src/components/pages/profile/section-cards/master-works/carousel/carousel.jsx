import React from 'react';
import useMediaQuery from '../../../../../../hooks/use-media-query';
import CarouselDesktop from './carousel-desktop/carousel-desktop';
import CarouselPhone from './carousel-phone/carousel-phone';

const Carousel = ({ state }) => {
  const isPhone = useMediaQuery(600);
  return isPhone ? <CarouselPhone state={state} /> : <CarouselDesktop state={state} />;
};

export default Carousel;
