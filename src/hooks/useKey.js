import { useState, useEffect } from 'react';

const useKey = (onClose) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      const { key } = e;

      if (key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
};

export default useKey;
