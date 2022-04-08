import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setOnlineStatus } from '../../../../redux/messages/actions';

const useGetStatus = (interlocutorId) => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  useEffect(() => {
    const getOnlineStatus = async () => {
      const config = {
        method: 'get',
        url: `/profile/${interlocutorId}/online`,
        accessToken,
      };

      const data = await asyncAction(config);

      if (data) {
        dispatch(setOnlineStatus({ ...data, interlocutorId }));
      }
    };

    if (interlocutorId) getOnlineStatus();
  }, [accessToken, asyncAction, interlocutorId, dispatch]);

  return isLoading;
};

export default useGetStatus;
