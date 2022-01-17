import { useState } from 'react';

const useMessagesState = () => {
  const [state, setState] = useState({
    activeDialog: { user: {} },
    isFavoriteMasters: false,
  });

  const messagesClassName = state.activeDialog.interlocutorId
    ? 'messages--active-dialog'
    : 'messages--dialogs';

  const showFavoriteMasters = () => setState((state) => ({ ...state, isFavoriteMasters: true }));
  const closeFavoriteMasters = () => setState((state) => ({ ...state, isFavoriteMasters: false }));
  const backToDialogs = () => setState((state) => ({ ...state, activeDialog: { user: {} } }));
  const setActiveDialog = (data) => setState((state) => ({ ...state, activeDialog: data }));

  const functions = { showFavoriteMasters, closeFavoriteMasters, backToDialogs, setActiveDialog };

  return [state, messagesClassName, functions];
};

export default useMessagesState;
