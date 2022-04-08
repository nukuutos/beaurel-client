import { useSelector } from 'react-redux';
import DisplayMessages from './display-messages/display-messages';
import useDialog from './use-dialog';
import useOnlineSocket from './use-online-socket';
import useGetStatus from './use-status';

const Dialog = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);

  const { _id: interlocutorId } = activeInterlocutor;

  const [dialogRef, isLoading] = useDialog(interlocutorId);

  useGetStatus(interlocutorId);
  useOnlineSocket(interlocutorId);

  const noActiveUserClassName = interlocutorId ? '' : 'dialog--no-active-user';

  return (
    <div ref={dialogRef} className={`messages__dialog dialog ${noActiveUserClassName}`}>
      {!interlocutorId && <div className="messages__no-active-user">выберите диалог</div>}
      {isLoading && <div className="messages__spinner spinner--tiny spinner spinner--absolute" />}
      {!isLoading && <DisplayMessages />}
    </div>
  );
};

export default Dialog;
