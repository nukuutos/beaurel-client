import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import getAvatarPath from '../../../utils/get-avatar-path';
import Pen from '../../../../base/icons/pen';

const DisplayAvatar = ({ setIsEdit, isEdit, editCounter }) => {
  const [avatar, setAvatar] = useState('/svg/default.svg');
  const { id: userId, isAvatar } = useSelector((state) => state.profile);

  useEffect(() => {
    const url = getAvatarPath(userId, isAvatar, editCounter);
    setAvatar(url);
  }, [isAvatar, userId, isEdit, editCounter]);

  return (
    <div onClick={() => setIsEdit(true)} className="avatar profile__avatar">
      <Image
        sizes="(max-width: 600px) 72px, (max-width: 900px) 116px, 140px"
        quality={100}
        objectFit="contain"
        layout="fill"
        src={avatar}
        alt="Profile"
        className="avatar__image"
      />
      <div className="avatar__change-image">
        <Pen className="avatar__pen-icon" />
      </div>
    </div>
  );
};

export default DisplayAvatar;
