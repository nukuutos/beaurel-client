import React, { useState } from 'react';
import useSwipes from './use-swipes';

const useSlider = () => {
  const [index, setIndex] = useState(0);

  const masterOptionOnClick = () => setIndex(0);
  const customerOptionOnClick = () => setIndex(1);

  const handlers = useSwipes({ index, masterOptionOnClick, customerOptionOnClick });
  // const updateIndex = () => setIndex((index) => (index + 1) % 2);

  const styles = { transform: `translateX(${index * -50}%)` };

  let masterOptionClassName = 'feature-switch__option';
  let customerOptionClassName = 'feature-switch__option';

  if (index) customerOptionClassName += ' feature-switch__option--active';
  else masterOptionClassName += ' feature-switch__option--active';

  const classNames = { customerOptionClassName, masterOptionClassName };
  const handleClicks = { masterOptionOnClick, customerOptionOnClick };

  return { classNames, handlers, handleClicks, styles };
};

export default useSlider;
