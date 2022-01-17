import { useSelector } from 'react-redux';
import Message from './message';
import useGetMessages from './use-get-messages';
import useSetViewed from './use-set-viewed';

const DisplayMessages = ({ interlocutorId }) => {
  const { dialogsMessages } = useSelector((state) => state.messages);

  const messages = dialogsMessages[interlocutorId] ? dialogsMessages[interlocutorId] : [];

  const [messageToStartLoadData, isLoading] = useGetMessages(interlocutorId);
  const messageToSetIsRead = useSetViewed(interlocutorId);

  let wasFirstRecipientMessage;

  return (
    <>
      {messages.map((messageObject, index) => {
        if (index === messages.length - 1) {
          return (
            <Message
              refToLoad={messageToStartLoadData}
              messageData={messageObject}
              interlocutorId={interlocutorId}
            />
          );
        }

        if (
          !wasFirstRecipientMessage &&
          messageObject.senderId === interlocutorId &&
          messageObject.isUnread
        ) {
          wasFirstRecipientMessage = true;
          console.log(messageObject);

          return (
            <Message
              messageData={messageObject}
              interlocutorId={interlocutorId}
              nextMessageDate={messages[index + 1].createdAt}
              refToSetMessageVisibility={messageToSetIsRead}
            />
          );
        }

        return (
          <Message
            messageData={messageObject}
            interlocutorId={interlocutorId}
            nextMessageDate={messages[index + 1].createdAt}
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
