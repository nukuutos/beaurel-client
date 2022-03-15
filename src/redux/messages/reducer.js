import dayjs from 'dayjs';
import {
  SET_DIALOGS,
  SET_DIALOG_MESSAGES,
  PUSH_MESSAGE,
  GET_DIALOG_MESSAGES,
  GET_MESSAGE_FROM_INTERLOCUTOR,
  SET_MESSAGES_VIEWED,
  SET_MESSAGES_VIEWED_BY_RECIPIENT,
  SET_ACTIVE_INTERLOCUTOR,
  SET_ONLINE_STATUS,
  SET_MESSAGE_NOTIFICATION,
  GET_DIALOGS_ON_SCROLL,
} from './types';

const INITIAL_STATE = {
  dialogs: [],
  dialogsMessages: {},
  activeInterlocutor: {},
  isNotification: false,
};

const messagesReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DIALOGS: {
      const { dialogs } = payload;

      return {
        ...state,
        dialogs: dialogs.map(({ createdAt, ...rest }) => ({
          createdAt: dayjs(createdAt),
          ...rest,
        })),
      };
    }

    case GET_DIALOGS_ON_SCROLL: {
      const { dialogs } = payload;

      return {
        ...state,
        dialogs: [
          ...state.dialogs,
          ...dialogs.map(({ createdAt, ...rest }) => ({
            createdAt: dayjs(createdAt),
            ...rest,
          })),
        ],
      };
    }

    case SET_DIALOG_MESSAGES: {
      const { interlocutorId, messages } = payload;
      const dialogsMessages = { ...state.dialogsMessages };

      dialogsMessages[interlocutorId] = {
        messages: messages.map(({ createdAt, ...rest }) => ({
          createdAt: dayjs(createdAt),
          ...rest,
        })),
        isLoaded: true,
      };

      // set read state to messages
      const dialogs = [...state.dialogs];

      for (const dialog of dialogs) {
        if (dialog._id !== interlocutorId) continue;
        dialog.isUnread = false;
      }

      return { ...state, dialogsMessages, dialogs };
    }

    case GET_DIALOG_MESSAGES: {
      const { interlocutorId, messages } = payload;
      const dialogsMessages = { ...state.dialogsMessages };

      const messagesByDayjs = messages.map(({ createdAt, ...rest }) => ({
        createdAt: dayjs(createdAt),
        ...rest,
      }));

      const newMessages = [...dialogsMessages[interlocutorId].messages, ...messagesByDayjs];

      dialogsMessages[interlocutorId].messages = newMessages;

      return { ...state, dialogsMessages };
    }

    case PUSH_MESSAGE: {
      const { message } = payload;
      const dialogsMessages = { ...state.dialogsMessages };
      // set new message to dialog
      let newDialog = [message];
      const currentDialog = dialogsMessages[message._id]?.messages;
      if (currentDialog) {
        newDialog = [message, ...currentDialog];
      }
      dialogsMessages[message._id].messages = newDialog;
      // change dialog card data
      const dialogs = [...state.dialogs];
      const filteredDialogs = dialogs.filter((dialog) => dialog._id !== message._id);
      const newDialogs = [message, ...filteredDialogs];

      return {
        ...state,
        dialogs: newDialogs,
        dialogsMessages,
      };
    }

    case GET_MESSAGE_FROM_INTERLOCUTOR: {
      const { message } = payload;

      message.createdAt = dayjs(message.createdAt);

      const dialogsMessages = { ...state.dialogsMessages };
      // set new message to dialog
      let newDialog = [message];
      const currentDialog = dialogsMessages[message.senderId]?.messages;
      if (currentDialog) {
        newDialog = [message, ...currentDialog];
      }
      dialogsMessages[message.senderId] = {
        messages: newDialog,
        isLoaded: dialogsMessages[message.senderId]?.isLoaded,
      };
      // change dialog card data
      const dialogs = [...state.dialogs];
      const filteredDialogs = dialogs.filter((dialog) => dialog._id !== message.senderId);
      const newDialogs = [{ ...message, _id: message.senderId }, ...filteredDialogs];
      // notifications
      let isNotification = false;
      if (state.activeInterlocutor._id !== message.senderId) {
        isNotification = true;
      }

      return {
        ...state,
        dialogs: newDialogs,
        dialogsMessages,
        isNotification,
      };
    }

    case SET_MESSAGES_VIEWED: {
      const { interlocutorId } = payload;

      const dialogsMessages = { ...state.dialogsMessages };
      // read messages
      const currentDialog = dialogsMessages[interlocutorId].messages;
      const viewedDialog = currentDialog.map((message) => {
        const { senderId, isUnread } = message;
        if (senderId === interlocutorId && isUnread) return { ...message, isUnread: false };
        return message;
      });
      dialogsMessages[interlocutorId].messages = viewedDialog;

      // change dialog card data (read last message)
      const dialogs = [...state.dialogs];
      const dialogIndex = dialogs.findIndex((dialog) => dialog._id === interlocutorId);
      dialogs[dialogIndex].isUnread = false;

      // check notifications
      const isNotification = dialogs.some(
        (dialog) => dialog.isUnread && dialog.senderId === interlocutorId
      );

      return {
        ...state,
        dialogs,
        dialogsMessages,
        isNotification,
      };
    }

    case SET_MESSAGES_VIEWED_BY_RECIPIENT: {
      const { recipientId } = payload;

      const dialogsMessages = { ...state.dialogsMessages };
      // read messages
      const currentDialog = dialogsMessages[recipientId].messages;
      const viewedDialog = currentDialog.map((message) => {
        const { isUnread } = message;
        if (message.recipientId === recipientId && isUnread) return { ...message, isUnread: false };
        return message;
      });
      dialogsMessages[recipientId].messages = viewedDialog;

      return {
        ...state,
        dialogsMessages,
      };
    }

    case SET_ACTIVE_INTERLOCUTOR: {
      return {
        ...state,
        activeInterlocutor: payload,
      };
    }

    case SET_ONLINE_STATUS: {
      const { wasOnline } = payload;

      const activeInterlocutor = { ...state.activeInterlocutor, wasOnline };

      return {
        ...state,
        activeInterlocutor,
      };
    }

    case SET_MESSAGE_NOTIFICATION: {
      return {
        ...state,
        isNotification: true,
      };
    }

    default:
      return state;
  }
};

export default messagesReducer;
