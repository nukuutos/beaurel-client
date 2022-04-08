import { useSelector } from 'react-redux';

const useMessages = () => {
  const { activeInterlocutor, dialogsMessages } = useSelector((state) => state.messages);

  const { _id: interlocutorId } = activeInterlocutor;

  const dialog = dialogsMessages[interlocutorId];

  if (dialog) return dialog.messages;
  return [];
};

export default useMessages;
