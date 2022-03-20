import { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import asyncCall from './async-call';

const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false);
  const dispatch = useDispatch();

  const asyncAction = useCallback(
    async (config) => {
      isCancelled.current = false;

      setIsLoading(true);

      const data = await asyncCall(dispatch, config);

      if (!isCancelled.current) setIsLoading(false);

      return data || null;
    },
    [dispatch]
  );

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return [asyncAction, isLoading, isCancelled];
};

export default useAsyncAction;
