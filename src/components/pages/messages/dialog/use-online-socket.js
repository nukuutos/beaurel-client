import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import openSocket from 'socket.io-client';

const useOnlineSocket = (interlocutorId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = openSocket('http://localhost:5000');

    const event = `${interlocutorId}-online`;

    socket.on(event, (data) => {
      dispatch(data);
    });

    return () => socket.removeAllListeners(event);
  }, [dispatch, interlocutorId]);
};

export default useOnlineSocket;
