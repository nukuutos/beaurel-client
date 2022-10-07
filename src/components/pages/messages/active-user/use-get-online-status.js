import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import openSocket from 'socket.io-client';
import { setOnlineStatus } from '../../../../redux/slices/messages';

export const SET_ONLINE_STATUS = 'SET_ONLINE_STATUS';

const useGetOnlineStatus = (interlocutorId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = openSocket(
      `${process.env.NEXT_PUBLIC_HTTP}://${process.env.NEXT_PUBLIC_SERVER_URL}`
    );

    const event = `${interlocutorId}-online`;

    socket.on(event, (data) => {
      const { type, payload } = data;

      switch (type) {
        case SET_ONLINE_STATUS:
          dispatch(setOnlineStatus(payload));
          break;

        default:
          break;
      }

      dispatch(data);

      return () => socket.removeAllListeners(event);
    });
  }, [dispatch, interlocutorId]);
};

export default useGetOnlineStatus;
