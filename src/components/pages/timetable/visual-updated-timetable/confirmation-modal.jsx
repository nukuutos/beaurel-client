import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../base/modal/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import useDeleteUpdate from './use-delete-update';

const ConfirmationModal = ({ closeModal }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [deleteUpdate, isLoading] = useDeleteUpdate();

  return (
    <Modal onClickClose={closeModal}>
      <div className={`update-cancellation ${isPhone ? '' : 'card'}`}>
        {isLoading && <div className="spinner-with-background" />}

        <ModalHeading title="Предупреждение" onClickClose={closeModal} />
        <p className="update-cancellation__text">Вы действительно хотите отменить обновление?</p>

        <div onClick={deleteUpdate} className="btn mt-8 btn--primary btn--fail">
          Отменить
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
