import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { pushMessage } from '../../../../redux/messages/actions';

const useOnSubmit = (activeDialog) => {
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const { interlocutorId, user } = activeDialog;

  const updateScroll = () => {
    const dialog = document.querySelector('.messages__dialog');
    dialog.scrollTop = dialog.scrollHeight;
  };

  const handleSubmit = async ({ message }, { resetForm }) => {
    const config = {
      method: 'post',
      url: `/profile/${profileId}/message/${interlocutorId}`,
      data: { message },
      accessToken,
    };

    await asyncAction(config);

    const messageData = {
      _id: interlocutorId,
      isUnread: true,
      user,
      senderId: profileId,
      recipientId: interlocutorId,
      createdAt: dayjs(),
      message,
    };

    dispatch(pushMessage({ message: messageData }));

    updateScroll();

    resetForm();
  };

  return [handleSubmit, isLoading];
};

export default useOnSubmit;
