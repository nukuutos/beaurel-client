const getLastMessage = ({ interlocutorId, senderId, message }) => {
  const words = message.split(' ');

  let lastMessage = '';
  for (const word of words) {
    const wordLength = word.length;
    const messageLength = lastMessage.length;
    if (messageLength + wordLength <= 20) {
      lastMessage = `${lastMessage} ${word}`;
    } else break;
  }

  if (message.length > lastMessage.length) lastMessage += '...';

  return interlocutorId === senderId ? lastMessage : `Вы: ${lastMessage}`;
};

export default getLastMessage;
