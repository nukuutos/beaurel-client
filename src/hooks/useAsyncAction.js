import { useState, useRef, useEffect } from 'react';
import asyncCall from '../utils/async-call';
import { useDispatch } from 'react-redux';

const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false);
  const dispatch = useDispatch();
  // const [state, setState] = useState({ isLoading: false, data: null });

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

  return [asyncAction, isLoading];
};

export default useAsyncAction;
