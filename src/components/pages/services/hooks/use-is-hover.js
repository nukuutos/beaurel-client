import { useState } from 'react';

const useIsHover = () => {
  const [isHover, setIsHover] = useState(false);

  const events = { onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false) };

  return [isHover, events];
};

export default useIsHover;
