import DisplayMessages from './display-messages';
import useDialog from './use-dialog';
import useSocket from './use-socket';

const Dialog = ({ activeDialog = {} }) => {
  const { interlocutorId } = activeDialog;
  const [dialogRef, isLoading] = useDialog(interlocutorId);

  const noActiveUserClassName = interlocutorId ? '' : 'dialog--no-active-user';

  useSocket();

  return (
    <div ref={dialogRef} className={`messages__dialog dialog ${noActiveUserClassName}`}>
      {!interlocutorId && <div className="messages__no-active-user">выберите диалог</div>}
      {isLoading && <div className="messages__spinner spinner--tiny spinner spinner--absolute" />}
      {!isLoading && <DisplayMessages interlocutorId={interlocutorId} />}
    </div>
  );
};

export default Dialog;
