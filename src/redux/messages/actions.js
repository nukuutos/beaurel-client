import {
  SET_DIALOGS,
  SET_DIALOG_MESSAGES,
  PUSH_MESSAGE,
  GET_DIALOG_MESSAGES,
  SET_MESSAGES_VIEWED,
} from './types';

export const setDialogs = (dialogs) => ({
  type: SET_DIALOGS,
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
