import getAvatarPath from '../../utils/get-avatar-path';
import getLastMessage from './get-last-message';
import getTime from './get-time';

const getUnreadClassName = ({ isUnread, senderId, interlocutorId }) =>
  isUnread && senderId === interlocutorId ? 'dialog-card--unread' : '';

const getActiveClassName = ({ activeDialog, interlocutorId }) =>
  activeDialog?.interlocutorId === interlocutorId ? 'dialog-card--active' : '';

const DialogCard = ({ dialog, activeDialog, setDialog }) => {
  const { _id: interlocutorId, senderId, user, message, isUnread, createdAt } = dialog;
  const { firstName, lastName, avatar } = user;

  const avatarUrl = getAvatarPath(avatar);
  const name = `${firstName} ${lastName[0]}.`;

  const unreadClassName = getUnreadClassName({ isUnread, senderId, interlocutorId });
  const activeClassName = getActiveClassName({ activeDialog, interlocutorId });

  const lastMessage = getLastMessage({ interlocutorId, senderId, message });
  const time = getTime(createdAt);

  return (
    <div
      onClick={() => setDialog({ interlocutorId, user })}
      className={`messages__dialog-card dialog-card ${unreadClassName} ${activeClassName}`}
    >
      <img src={avatarUrl} alt="User" className="dialog-card__avatar" />
      <div className="active-user__group">
        <h3 className="dialog-card__name">{name}</h3>
        <span className="dialog-card__last-message">{lastMessage}</span>
      </div>
      <div className="dialog-card__time">{time}</div>
    </div>
  );
};

export default DialogCard;
