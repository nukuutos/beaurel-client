import { useSelector } from 'react-redux';
import getAvatarPath from '../../utils/get-avatar-path';

const useUserData = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);
  const { avatar, firstName, lastName } = activeInterlocutor;

  const name = `${firstName} ${lastName[0]}.`;
  const avatarUrl = getAvatarPath(avatar);

  return { name, avatarUrl };
};

export default useUserData;
