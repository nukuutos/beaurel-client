import React, { useState } from 'react';
import DisplayAvatar from './display-avatar';
import EditAvatar from './edit-avatar';

const Avatar = function ({ className = '' }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <DisplayAvatar className={className} setIsEdit={setIsEdit} />
      {isEdit && <EditAvatar setIsEdit={setIsEdit} />}
    </>
  );
};

export default Avatar;
