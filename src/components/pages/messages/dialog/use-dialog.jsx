import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setDialogMessages } from '../../../../redux/messages/actions';

const useDialog = (interlocutorId) => {
  const dialogRef = useRef(null);
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const dialogsMessages = useSelector((state) => state.messages.dialogsMessages);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const needToGetMessages = interlocutorId && !dialogsMessages[interlocutorId]?.isLoaded;

  useEffect(() => {
    const updateScroll = () => {
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    };

    const getMessages = async () => {
      const config = {
        method: 'get',
        url: `/profile/${profileId}/message/${interlocutorId}`,
        params: { page: 0 },
        accessToken,
      };

      const data = await asyncAction(config);

      if (data) {
        dispatch(setDialogMessages({ interlocutorId, messages: data.dialog }));
        updateScroll();
      }
    };

    if (needToGetMessages) getMessages();
  }, [profileId, accessToken, asyncAction, interlocutorId, dispatch, needToGetMessages]);

  return [dialogRef, isLoading];
};

export default useDialog;
