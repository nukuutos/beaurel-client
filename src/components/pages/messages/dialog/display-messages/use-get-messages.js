import { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import { getDialogMessages } from '../../../../../redux/messages/actions';

const MESSAGES_LIMIT_TO_LOAD = 20;

const useGetMessages = (interlocutorId) => {
  const [{ id: profileId, accessToken }, { dialogsMessages }] = useSelector((state) => [
    state.auth,
    state.messages,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const observer = useRef();

  const page = useRef(0);
  const hasMore = useRef(true);

  useEffect(() => {
    page.current = 0;
  }, [interlocutorId]);

  const messagesLength = dialogsMessages[interlocutorId]?.messages.length || 0;

  // we have observer ref and last element ref
  // and we need to change last element ref on every new load so we use useCallback as ref
  const messageToStartLoadData = useCallback(
    (node) => {
      const needToLoad = messagesLength >= MESSAGES_LIMIT_TO_LOAD;
      // if we have already loading
      if (isLoading || !needToLoad) return;

      // if observer has already existed
      if (observer.current) observer.current.disconnect();

      // entries here are everything that becomes visible (we're observing only one single node)
      observer.current = new IntersectionObserver(async (entries) => {
        const element = entries[0];
        // check api has data to load? hasMore
        if (element.isIntersecting && hasMore.current) {
          page.current++;

          const config = {
            method: 'get',
            url: `/profile/${profileId}/message/${interlocutorId}`,
            params: { page: page.current },
            accessToken,
          };

          const data = await asyncAction(config);

          if (data?.dialog.length) {
            dispatch(getDialogMessages({ interlocutorId, messages: data.dialog }));
          } else {
            hasMore.current = false;
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [dispatch, asyncAction, isLoading, accessToken, profileId, interlocutorId, messagesLength]
  );

  return [messageToStartLoadData, isLoading];
};

export default useGetMessages;
