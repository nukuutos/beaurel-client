import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
import ModalFallback from '../../../shared/modal-fallback';
import DisplayAvatar from './display-avatar';

const EditAvatar = dynamic(() => import('./edit-avatar/edit-avatar'), {
  loading: () => <ModalFallback />,
});

const Avatar = () => {
  const [isEdit, setIsEdit] = useState(false);
  const closeModal = () => setIsEdit(false);
  const editCounterRef = useRef(0);

  return (
    <>
      <DisplayAvatar editCounter={editCounterRef.current} isEdit={isEdit} setIsEdit={setIsEdit} />
      {isEdit && <EditAvatar editCounterRef={editCounterRef} closeModal={closeModal} />}
    </>
  );
};

export default Avatar;
