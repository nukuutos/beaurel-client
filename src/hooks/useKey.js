import { useState, useEffect } from 'react';

const useKey = (onClose) => {
  // const [isSlider, setIsSlider] = useState(true);

  useEffect(() => {
    const onKeyDown = (e) => {
      const { key } = e;

      if (key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // return [isSlider, setIsSlider];
};

export default useKey;
