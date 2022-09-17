import { useEffect, useState } from 'react';

const useTimer = () => {
  const [timer, setTimer] = useState(60);
  const decrement = () => setTimer((timer) => timer - 1);
  const reset = () => setTimer(60);

  useEffect(() => {
    let interval;

    if (timer) {
      interval = setInterval(() => {
        decrement();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return [timer, reset];
};

export default useTimer;
