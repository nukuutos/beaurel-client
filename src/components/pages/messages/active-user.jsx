import { useRouter } from 'next/router';
import React from 'react';
import getAvatarPath from '../utils/get-avatar-path';

const ActiveUser = ({ activeDialog = { user: {} } }) => {
  const { user } = activeDialog;
  const { avatar, firstName, lastName, status, _id, username } = user;

  const router = useRouter();

  const avatarUrl = getAvatarPath(avatar);
  const name = `${firstName} ${lastName[0]}.`;

  const goToProfile = () => router.push('/[id]', `/${username || _id}`);

  return (
    <div className="messages__active-user active-user">
      <img onClick={goToProfile} src={avatarUrl} alt="User" className="active-user__avatar" />
      <div className="active-user__group">
        <h3 onClick={goToProfile} className="active-user__name">
          {name}
        </h3>
        <span className="active-user__status">В сети</span>
      </div>
    </div>
  );
};

export default ActiveUser;
