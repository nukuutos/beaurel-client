import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import hydrateState from '../hydrate-state';

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
      state.dialogs = dialogs;
    },

    getDialogsOnScroll: (state, action) => {
      const { dialogs } = action.payload;
      state.dialogs = [...state.dialogs, ...dialogs];
    },

    setDialogMessages: (state, action) => {
      const { interlocutorId, messages } = action.payload;

      state.dialogsMessages[interlocutorId] = {
        messages,
        isLoaded: true,
      };

      for (const dialog of state.dialogs) {
        if (dialog._id !== interlocutorId) continue;
        dialog.isUnread = false;
      }
    },

    getDialogMessages: (state, action) => {
      const { interlocutorId, messages } = action.payload;

      state.dialogsMessages[interlocutorId].messages = [
        ...state.dialogsMessages[interlocutorId].messages,
        ...messages,
      ];
    },

    pushMessage: (state, action) => {
      const { message } = action.payload;

      // set new message to dialog
      const currentDialog = state.dialogsMessages[message._id]?.messages;

      let newDialog = [message];

      if (currentDialog) {
        newDialog = [message, ...currentDialog];
      }

      state.dialogsMessages[message._id].messages = newDialog;

      // change dialog card data
      const dialogs = [...state.dialogs];
      const filteredDialogs = dialogs.filter((dialog) => dialog._id !== message._id);
      state.dialogs = [message, ...filteredDialogs]; // ?
    },

    getMessageFromInterlocutor: (state, action) => {
      const { message } = action.payload;
      // set new message to dialog
      const currentDialog = state.dialogsMessages[message.senderId]?.messages;

      let newDialog = [message];

      if (currentDialog) {
        newDialog = [message, ...currentDialog];
      }

      state.dialogsMessages[message.senderId] = {
        messages: newDialog,
        isLoaded: state.dialogsMessages[message.senderId]?.isLoaded,
      };

      // change dialog card data
      const dialogs = [...state.dialogs];
      const filteredDialogs = dialogs.filter((dialog) => dialog._id !== message.senderId);
      state.dialogs = [{ ...message, _id: message.senderId }, ...filteredDialogs];

      // notifications
      state.isNotification = false;
      if (state.activeInterlocutor._id !== message.senderId) {
        state.isNotification = true;
      }
    },

    setMessagesViewed: (state, action) => {
      const { interlocutorId } = action.payload;

      // read messages
      const currentDialog = state.dialogsMessages[interlocutorId].messages;

      const viewedDialog = currentDialog.map((message) => {
        const { senderId, isUnread } = message;
        if (senderId === interlocutorId && isUnread) return { ...message, isUnread: false };
        return message;
      });

      state.dialogsMessages[interlocutorId].messages = viewedDialog;

      // change dialog card data (read last message)
      const dialogIndex = state.dialogs.findIndex((dialog) => dialog._id === interlocutorId);
      state.dialogs[dialogIndex].isUnread = false;

      // check notifications
      state.isNotification = state.dialogs.some(
        (dialog) => dialog.isUnread && dialog.senderId === interlocutorId
      );
    },

    setMessagesViewedByRecipient: (state, action) => {
      const { recipientId } = action.payload;

      // read messages
      const currentDialog = state.dialogsMessages[recipientId].messages;
      const viewedDialog = currentDialog.map((message) => {
        const { isUnread } = message;
        if (message.recipientId === recipientId && isUnread) return { ...message, isUnread: false };
        return message;
      });

      state.dialogsMessages[recipientId].messages = viewedDialog;
    },

    setActiveInterlocutor: (state, action) => ({
      ...state,
      activeInterlocutor: action.payload,
    }),

    setOnlineStatus: (state, action) => {
      const { wasOnline } = action.payload;

      state.activeInterlocutor.wasOnline = wasOnline;
    },

    setMessageNotification: (state) => ({
      ...state,
      isNotification: true,
    }),
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      const nextState = {
        ...state,
        ...action.payload.messages,
      };

      // console.log(current(state), action.payload);

      const newActiveInterlocutor = hydrateState(
        state.activeInterlocutor,
        nextState.activeInterlocutor
      );

      nextState.activeInterlocutor = newActiveInterlocutor;

      // return {
      //   ...state,
      //   ...action.payload.messages,
      // };
      return nextState;
    },
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
