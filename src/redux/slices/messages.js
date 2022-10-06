import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  dialogs: [],
  dialogsMessages: {},
  activeInterlocutor: {},
  isNotification: false,
};

const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setDialogs: (state, action) => {
      const { dialogs } = action.payload;

      return {
        ...state,
        dialogs,
        // dialogs: dialogs.map(({ createdAt, ...rest }) => ({
        //   createdAt: dayjs(createdAt),
        //   ...rest,
        // })),
      };
    },

    getDialogsOnScroll: (state, action) => {
      const { dialogs } = action.payload;

      return {
        ...state,
        dialogs: [
          ...state.dialogs,
          ...dialogs,
          // ...dialogs.map(({ createdAt, ...rest }) => ({
          //   createdAt: dayjs(createdAt),
          //   ...rest,
          // })),
        ],
      };
    },

    setDialogMessages: (state, action) => {
      const { interlocutorId, messages } = action.payload;
      const dialogsMessages = { ...state.dialogsMessages };

      dialogsMessages[interlocutorId] = {
        // messages: messages.map(({ createdAt, ...rest }) => ({
        //   createdAt: dayjs(createdAt),
        //   ...rest,
        // })),
        messages,
        isLoaded: true,
      };

      // set read state to messages
      const dialogs = [...state.dialogs];

      for (const dialog of dialogs) {
        if (dialog._id !== interlocutorId) continue;
        dialog.isUnread = false;
      }

      return { ...state, dialogsMessages, dialogs };
    },

    getDialogMessages: (state, action) => {
      const { interlocutorId, messages } = action.payload;
      const dialogsMessages = { ...state.dialogsMessages };

      // const messagesByDayjs = messages.map(({ createdAt, ...rest }) => ({
      //   createdAt: dayjs(createdAt),
      //   ...rest,
      // }));

      // const newMessages = [...dialogsMessages[interlocutorId].messages, ...messagesByDayjs];
      const newMessages = [...dialogsMessages[interlocutorId].messages, ...messages];

      dialogsMessages[interlocutorId].messages = newMessages;

      return { ...state, dialogsMessages };
    },

    pushMessage: (state, action) => {
      const { message } = action.payload;
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
    },

    getMessageFromInterlocutor: (state, action) => {
      const { message } = action.payload;

      // message.createdAt = dayjs(message.createdAt);

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
    },

    setMessagesViewed: (state, action) => {
      const { interlocutorId } = action.payload;

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
    },

    setMessagesViewedByRecipient: (state, action) => {
      const { recipientId } = action.payload;

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
    },

    setActiveInterlocutor: (state, action) => ({
      ...state,
      activeInterlocutor: action.payload,
    }),

    setOnlineStatus: (state, action) => {
      const { wasOnline } = action.payload;

      const activeInterlocutor = { ...state.activeInterlocutor, wasOnline };

      return {
        ...state,
        activeInterlocutor,
      };
    },

    setMessageNotification: (state, action) => ({
      ...state,
      isNotification: true,
    }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.messages,
    }),
  },
});

const { actions, reducer } = slice;

export const {
  setDialogs,
  getDialogsOnScroll,
  setDialogMessages,
  getDialogMessages,
  pushMessage,
  getMessageFromInterlocutor,
  setMessagesViewed,
  setMessagesViewedByRecipient,
  setActiveInterlocutor,
  setOnlineStatus,
  setMessageNotification,
} = actions;

export default reducer;
