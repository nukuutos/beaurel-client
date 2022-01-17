import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setMessagesViewed } from '../../../../redux/messages/actions';

const useSetViewed = (interlocutorId) => {
  const [{ id: profileId, accessToken }, { dialogsMessages }] = useSelector((state) => [
    state.auth,
    state.messages,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const observer = useRef();
  const messages = dialogsMessages[interlocutorId] || [];

  const messageToSetRead = useCallback(
    (node) => {
      if (isLoading) return;

      // if observer has already existed
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        const element = entries[0];
        if (element.isIntersecting) {
          const config = {
            method: 'put',
            url: `/profile/${profileId}/message/${interlocutorId}/`,
            accessToken,
          };
          await asyncAction(config);
          dispatch(setMessagesViewed({ interlocutorId }));
          observer.current.unobserve(element.target);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [dispatch, asyncAction, isLoading, accessToken, profileId, interlocutorId, messages.length]
  );

  return messageToSetRead;
};

export default useSetViewed;
