import dayjs from 'dayjs';
import {
  SET_DIALOGS,
  SET_DIALOG_MESSAGES,
  PUSH_MESSAGE,
  GET_DIALOG_MESSAGES,
  GET_MESSAGE_FROM_INTERLOCUTOR,
  SET_MESSAGES_VIEWED,
  SET_MESSAGES_VIEWED_BY_RECIPIENT,
} from './types';

const INITIAL_STATE = {
  dialogs: [],
  dialogsMessages: {},
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

    case SET_DIALOG_MESSAGES: {
      const { interlocutorId, messages } = payload;
      const dialogsMessages = { ...state.dialogsMessages };

      dialogsMessages[interlocutorId] = messages.map(({ createdAt, ...rest }) => ({
        createdAt: dayjs(createdAt),
        ...rest,
      }));

      // set read state to messages
      const dialogs = [...state.dialogs];

      for (const dialog of dialogs) {
        if (dialog._id !== interlocutorId) continue;
        dialog.isUnread = false;
      }

      return { dialogsMessages, dialogs };
    }

    case GET_DIALOG_MESSAGES: {
      const { interlocutorId, messages } = payload;
      const dialogsMessages = { ...state.dialogsMessages };

      const messagesByDayjs = messages.map(({ createdAt, ...rest }) => ({
        createdAt: dayjs(createdAt),
        ...rest,
      }));

      const newMessages = [...dialogsMessages[interlocutorId], ...messagesByDayjs];

      dialogsMessages[interlocutorId] = newMessages;

      return { ...state, dialogsMessages };
    }

    case PUSH_MESSAGE: {
      const { message } = payload;
      const dialogsMessages = { ...state.dialogsMessages };
      // set new message to dialog
      let newDialog = [message];
      const currentDialog = dialogsMessages[message._id];
      if (currentDialog) {
        newDialog = [message, ...currentDialog];
      }
      dialogsMessages[message._id] = newDialog;
      // change dialog card data
      const dialogs = [...state.dialogs];
      const filteredDialogs = dialogs.filter((dialog) => dialog._id !== message._id);
      const newDialogs = [message, ...filteredDialogs];

      return {
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
      const currentDialog = dialogsMessages[message.senderId];
      if (currentDialog) {
        newDialog = [message, ...currentDialog];
      }
      dialogsMessages[message.senderId] = newDialog;
      // change dialog card data
      const dialogs = [...state.dialogs];
      const filteredDialogs = dialogs.filter((dialog) => dialog._id !== message.senderId);
      const newDialogs = [{ ...message, _id: message.senderId }, ...filteredDialogs];

      return {
        dialogs: newDialogs,
        dialogsMessages,
      };
    }

    case SET_MESSAGES_VIEWED: {
      const { interlocutorId } = payload;

      const dialogsMessages = { ...state.dialogsMessages };
      // read messages
      const currentDialog = dialogsMessages[interlocutorId];
      const viewedDialog = currentDialog.map((message) => {
        const { senderId, isUnread } = message;
        if (senderId === interlocutorId && isUnread) return { ...message, isUnread: false };
        return message;
      });
      dialogsMessages[interlocutorId] = viewedDialog;

      // change dialog card data (read last message)
      const dialogs = [...state.dialogs];
      const dialogIndex = dialogs.findIndex((dialog) => dialog._id === interlocutorId);
      dialogs[dialogIndex].isUnread = false;

      return {
        dialogs,
        dialogsMessages,
      };
    }

    case SET_MESSAGES_VIEWED_BY_RECIPIENT: {
      const { recipientId } = payload;

      const dialogsMessages = { ...state.dialogsMessages };
      // read messages
      const currentDialog = dialogsMessages[recipientId];
      const viewedDialog = currentDialog.map((message) => {
        const { isUnread } = message;
        if (message.recipientId === recipientId && isUnread) return { ...message, isUnread: false };
        return message;
      });
      dialogsMessages[recipientId] = viewedDialog;

      return {
        ...state,
        dialogsMessages,
      };
    }

    default:
      return state;
  }
};

export default messagesReducer;
