import { useEffect } from 'react';

const useKeys = (getKeys) => {
  useEffect(() => {
    console.log('render');

    const onKeyDown = (e) => {
      const { key: pressedKey } = e;

      const keys = getKeys();

      keys.forEach(({ key, fn }) => {
        if (pressedKey === key) fn();
      });
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [getKeys]);
};

export default useKeys;
