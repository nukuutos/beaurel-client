import React from 'react';
import { useSelector } from 'react-redux';
import CarouselDesktop from './carousel-desktop/carousel-desktop';
import CarouselPhone from './carousel-phone/carousel-phone';

const Carousel = ({ state }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  return isPhone ? <CarouselPhone state={state} /> : <CarouselDesktop state={state} />;
};

export default Carousel;
