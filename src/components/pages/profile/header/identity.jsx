import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from './avatar/avatar';
import ProfileRating from './profile-rating';

const Identity = () => {
  const { role } = useSelector((state) => state.profile);

  const isMaster = role === 'master';

  return (
    <div className="profile__identity">
      <Avatar />
      {isMaster && <ProfileRating />}
    </div>
  );
};

export default Identity;
