import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveInterlocutor } from '../../../../redux/messages/actions';
import getAvatarPath from '../../utils/get-avatar-path';
import getLastMessage from './get-last-message';
import getTime from './get-time';

const getUnreadClassName = ({ isUnread, senderId, interlocutorId }) =>
  isUnread && senderId === interlocutorId ? 'dialog-card--unread' : '';

const getActiveClassName = ({ activeInterlocutor, interlocutorId }) =>
  activeInterlocutor?._id === interlocutorId ? 'dialog-card--active' : '';

const DialogCard = ({ dialogCardToRef = null, dialog }) => {
  const { activeInterlocutor } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const { _id: interlocutorId, senderId, user, message, isUnread, createdAt } = dialog;
  const { firstName, lastName, isAvatar } = user;

  const avatarUrl = getAvatarPath(interlocutorId, isAvatar);
  const name = `${firstName} ${lastName[0]}.`;

  const unreadClassName = getUnreadClassName({ isUnread, senderId, interlocutorId });
  const activeClassName = getActiveClassName({ activeInterlocutor, interlocutorId });

  const lastMessage = getLastMessage({ interlocutorId, senderId, message });
  const time = getTime(createdAt);

  const setInterlocutor = () => dispatch(setActiveInterlocutor({ _id: interlocutorId, ...user }));

  return (
    <div
      ref={dialogCardToRef}
      onClick={setInterlocutor}
      className={`messages__dialog-card dialog-card ${unreadClassName} ${activeClassName}`}
    >
      <div className="dialog-card__avatar">
        <Image
          layout="fill"
          src={avatarUrl}
          alt="User"
          className="dialog-card__image"
          sizes="40px"
        />
      </div>

      <div className="active-user__group">
        <h2 className="dialog-card__name">{name}</h2>
        <span className="dialog-card__last-message">{lastMessage}</span>
      </div>
      <div className="dialog-card__time">{time}</div>
    </div>
  );
};

export default DialogCard;
