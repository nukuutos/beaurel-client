import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DisplayAvatar from './display-avatar';
import EditAvatar from './edit-avatar';
import { useSelector } from 'react-redux';

const Avatar = ({ image, className = '' }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { avatar } = useSelector((state) => state.profile);

  return (
    <>
      <DisplayAvatar avatar={avatar} className={className} setIsEdit={setIsEdit} />
      {isEdit && <EditAvatar setIsEdit={setIsEdit} />}
    </>
  );
};

export default Avatar;
