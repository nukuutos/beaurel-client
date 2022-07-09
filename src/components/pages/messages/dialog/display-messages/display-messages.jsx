import { useSelector } from 'react-redux';
import Message from './message/message';
import useGetMessages from './use-get-messages';
import useMessages from './use-messages';
import useSetViewed from './use-set-viewed';

const DisplayMessages = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);

  const { _id: interlocutorId } = activeInterlocutor;

  const messages = useMessages();
  const [messageToStartLoadData, isLoading] = useGetMessages(interlocutorId);
  const messageToSetIsRead = useSetViewed(interlocutorId);

  let wasFirstRecipientMessage;

  return (
    <>
      {messages.map((messageObject, index) => {
        const isLastMessage = index === messages.length - 1;

        if (isLastMessage) {
          return (
            <Message
              refToLoad={messageToStartLoadData}
              messageData={messageObject}
              interlocutorId={interlocutorId}
              key={messageObject._id}
            />
          );
        }

        if (
          !wasFirstRecipientMessage &&
          messageObject.senderId === interlocutorId &&
          messageObject.isUnread
        ) {
          wasFirstRecipientMessage = true;

          return (
            <Message
              messageData={messageObject}
              interlocutorId={interlocutorId}
              nextMessageDate={messages[index + 1].createdAt}
              refToSetMessageVisibility={messageToSetIsRead}
              key={messageObject._id}
            />
          );
        }

        return (
          <Message
            messageData={messageObject}
            interlocutorId={interlocutorId}
            nextMessageDate={messages[index + 1].createdAt}
            key={messageObject._id}
          />
        );
      })}

      {isLoading && (
        <div className="dialog__spinner-wrapper">
          <div className="spinner--tiny spinner dialog__spinner" />
        </div>
      )}
    </>
  );
};

export default DisplayMessages;