import React, { useState } from 'react';
import UpdatePasswordForm from './update-password-form';

const UpdatePassword = () => {
  const [isEditModal, setIsEditModal] = useState(false);

  const closeModal = () => setIsEditModal(false);
  const openModal = () => setIsEditModal(true);

  return (
    <>
      <div className="settings__setting-card setting-card card">
        <div className="setting-card__heading">Изменить пароль</div>
        <div
          onClick={openModal}
          className="setting-card__change-password btn btn--secondary btn--flat"
        >
          Изменить
        </div>
      </div>
      {isEditModal && <UpdatePasswordForm onClickClose={closeModal} />}
    </>
  );
};

export default UpdatePassword;
