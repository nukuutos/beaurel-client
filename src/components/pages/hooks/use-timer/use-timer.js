import { useEffect, useState } from 'react';
import useResendCode from './use-resend-code';

const useTimer = (phone, url) => {
  const resendCodeCall = useResendCode(phone, url);

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

  const resendCode = () => {
    resendCodeCall();
    reset();
  };

  return [timer, resendCode];
};

export default useTimer;
