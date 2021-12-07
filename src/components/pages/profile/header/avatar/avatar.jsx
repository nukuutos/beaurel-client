import React, { useState } from 'react';
import DisplayAvatar from './display-avatar';
import EditAvatar from './edit-avatar/edit-avatar';

const Avatar = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <DisplayAvatar setIsEdit={setIsEdit} />
      {isEdit && <EditAvatar setIsEdit={setIsEdit} />}
    </>
  );
};

export default Avatar;
