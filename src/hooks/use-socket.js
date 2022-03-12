import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';

const useSocket = () => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const socket = openSocket('http://localhost:5000');
      socket.on(id, (data) => {
        dispatch(data);
      });

      return () => socket.removeAllListeners(id);
    }
  }, [dispatch, id]);
};

export default useSocket;
