import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getMessageDate from './get-message-date';
import getMessageTime from './get-message-time';

const Message = ({
  refToLoad = null,
  nextMessageDate = null,
  refToSetMessageVisibility = null,
  messageData,
  interlocutorId,
}) => {
  const { message, senderId, createdAt, isUnread } = messageData;

  const isInterlocutorMessage = senderId === interlocutorId;
  const recipientClassName = isInterlocutorMessage ? 'dialog__message--recipient' : '';

  const [isDate, date] = getMessageDate({ createdAt, nextMessageDate });
  const time = getMessageTime(createdAt);

  return (
    <div ref={refToLoad} className="dialog__message-wrapper">
      {isDate && <span className="dialog__date">{date}</span>}
      <span ref={refToSetMessageVisibility} className={`dialog__message ${recipientClassName}`}>
        {message}
        <span className="dialog__message-time">
          {time}
          {isUnread && !isInterlocutorMessage && (
            <FontAwesomeIcon className="dialog__message-status" icon="check" />
          )}
          {!isUnread && !isInterlocutorMessage && (
            <FontAwesomeIcon className="dialog__message-status" icon="check-double" />
          )}
        </span>
      </span>
    </div>
  );
};

export default Message;
