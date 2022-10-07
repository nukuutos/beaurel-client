import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';

import {
  bookAppointmentByCustomer,
  changeAppointmentStatusSocket,
  updateAppointmentToUnsuitableSocket,
} from '../../redux/slices/appointments';

import {
  getMessageFromInterlocutor,
  setMessagesViewedByRecipient,
  setOnlineStatus,
} from '../../redux/slices/messages';

import {
  BOOK_APPOINTMENT_BY_CUSTOMER,
  CHANGE_APPOINTMENT_STATUS_SOCKET,
  GET_MESSAGE_FROM_INTERLOCUTOR,
  SET_MESSAGES_VIEWED_BY_RECIPIENT,
  SET_ONLINE_STATUS,
  UPDATE_APPOINTMENT_TO_UNSUITABLE_SOCKET,
} from './actions';

const useSocket = () => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const socket = openSocket(
        `${process.env.NEXT_PUBLIC_HTTP}://${process.env.NEXT_PUBLIC_SERVER_URL}`
      );

      socket.on(id, (data) => {
        const { type, payload } = data;

        switch (type) {
          case GET_MESSAGE_FROM_INTERLOCUTOR:
            dispatch(getMessageFromInterlocutor(payload));
            break;

          case SET_MESSAGES_VIEWED_BY_RECIPIENT:
            dispatch(setMessagesViewedByRecipient(payload));
            break;

          // case SET_ONLINE_STATUS:
          //   dispatch(setOnlineStatus(payload));
          //   break;

          case BOOK_APPOINTMENT_BY_CUSTOMER:
            dispatch(bookAppointmentByCustomer(payload));
            break;

          case CHANGE_APPOINTMENT_STATUS_SOCKET:
            dispatch(changeAppointmentStatusSocket(payload));
            break;

          case UPDATE_APPOINTMENT_TO_UNSUITABLE_SOCKET:
            dispatch(updateAppointmentToUnsuitableSocket(payload));
            break;

          default:
            break;
        }

        dispatch(data);
      });

      return () => socket.removeAllListeners(id);
    }
  }, [dispatch, id]);
};

export default useSocket;
