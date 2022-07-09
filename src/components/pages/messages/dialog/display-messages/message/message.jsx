import Check from '../../../../../base/icons/check';
import CheckDouble from '../../../../../base/icons/check-double';
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
          {isUnread && !isInterlocutorMessage && <Check className="dialog__message-status" />}
          {!isUnread && !isInterlocutorMessage && (
            <CheckDouble className="dialog__message-status" />
          )}
        </span>
      </span>
    </div>
  );
};

export default Message;
