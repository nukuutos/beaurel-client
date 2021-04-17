import { useState, useRef, useEffect } from 'react';
import asyncCall from './async-call';
import { useDispatch } from 'react-redux';

const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false);
  const dispatch = useDispatch();

  const asyncAction = async (config) => {
    setIsLoading(true);

    const data = await asyncCall(dispatch, config);

    if (!isCancelled.current) setIsLoading(false);

    return data || null;
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return [asyncAction, isLoading, isCancelled];
};

export default useAsyncAction;
