import {
  SET_DIALOGS,
  SET_DIALOG_MESSAGES,
  PUSH_MESSAGE,
  GET_DIALOG_MESSAGES,
  SET_MESSAGES_VIEWED,
  SET_ACTIVE_INTERLOCUTOR,
  SET_ONLINE_STATUS,
  SET_MESSAGE_NOTIFICATION,
  GET_DIALOGS_ON_SCROLL,
} from './types';

export const setDialogs = (dialogs) => ({
  type: SET_DIALOGS,
  payload: dialogs,
});

export const getDialogsOnScroll = (dialogs) => ({
  type: GET_DIALOGS_ON_SCROLL,
  payload: dialogs,
});

export const setDialogMessages = (messages) => ({
  type: SET_DIALOG_MESSAGES,
  payload: messages,
});

export const pushMessage = (message) => ({
  type: PUSH_MESSAGE,
  payload: message,
});

export const getDialogMessages = (messages) => ({
  type: GET_DIALOG_MESSAGES,
  payload: messages,
});

export const setMessagesViewed = (interlocutorId) => ({
  type: SET_MESSAGES_VIEWED,
  payload: interlocutorId,
});

export const setActiveInterlocutor = (user) => ({
  type: SET_ACTIVE_INTERLOCUTOR,
  payload: user,
});

export const setOnlineStatus = (status) => ({
  type: SET_ONLINE_STATUS,
  payload: status,
});

export const setMessageNotification = () => ({
  type: SET_MESSAGE_NOTIFICATION,
});
