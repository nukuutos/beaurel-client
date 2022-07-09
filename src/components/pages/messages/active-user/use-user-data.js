import { useSelector } from 'react-redux';
import getAvatarPath from '../../utils/get-avatar-path';

const useUserData = () => {
  const { activeInterlocutor } = useSelector((state) => state.messages);
  const { isAvatar, firstName, lastName, _id } = activeInterlocutor;

  const name = `${firstName} ${lastName[0]}.`;
  const avatarUrl = getAvatarPath(_id, isAvatar);

  return { name, avatarUrl };
};

export default useUserData;
