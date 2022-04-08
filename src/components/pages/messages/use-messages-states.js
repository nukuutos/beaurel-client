import { useState } from 'react';
import { useSelector } from 'react-redux';

const useMessagesState = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);
  const [isFavoriteMasters, setIsFavoriteMasters] = useState(false);

  const messagesClassName = activeInterlocutor._id
    ? 'messages--active-dialog'
    : 'messages--dialogs';

  const showFavoriteMasters = () => setIsFavoriteMasters(true);
  const closeFavoriteMasters = () => setIsFavoriteMasters(false);

  const functions = { showFavoriteMasters, closeFavoriteMasters };

  return [isFavoriteMasters, messagesClassName, functions];
};

export default useMessagesState;
