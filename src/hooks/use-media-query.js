import { useEffect, useState, useCallback } from 'react';

const useMediaQuery = (maxWidth) => {
  const [isMaxWidth, setIsMaxWidth] = useState(true);

  const onResize = useCallback(() => {
    const isSuit = window.innerWidth <= maxWidth;
    if (isSuit) setIsMaxWidth(true);
    else setIsMaxWidth(false);
  }, [maxWidth]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return isMaxWidth;
};

export default useMediaQuery;
