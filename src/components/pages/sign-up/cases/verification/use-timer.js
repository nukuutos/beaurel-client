import { useEffect, useRef, useState } from 'react';
import useResendCode from '../use-resend-code';

const useTimer = (phone) => {
  const [state, setState] = useState({ timer: 60, isWorking: true });
  const resendCodeCall = useResendCode(phone);
  const timerRef = useRef(null);
  timerRef.current = state.timer;

  useEffect(() => {
    let interval;

    if (state.isWorking) {
      interval = setInterval(() => {
        setState((state) => ({ ...state, timer: state.timer - 1 }));

        if (!timerRef.current) {
          clearInterval(interval);
          setState((state) => ({ ...state, isWorking: false }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isWorking]);

  const resendCode = () => {
    resendCodeCall();
    setState({ isWorking: true, timer: 60 });
  };

  return [state.timer, resendCode];
};

export default useTimer;
