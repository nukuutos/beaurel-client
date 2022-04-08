import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useMessengerClassName = () => {
  const { _id: interlocutorId } = useSelector((state) => state.messages.activeInterlocutor);

  const router = useRouter();

  const className = router.pathname === '/messages' && interlocutorId ? 'layout--messenger' : '';

  return className;
};

export default useMessengerClassName;
