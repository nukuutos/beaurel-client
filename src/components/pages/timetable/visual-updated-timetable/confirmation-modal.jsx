import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../base/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import useDeleteUpdate from './use-delete-update';

const ConfirmationModal = ({ closeModal }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [deleteUpdate, isLoading] = useDeleteUpdate();

  return (
    <Modal isMobileBackground onClickClose={closeModal}>
      <div className={`update-cancellation ${isPhone ? '' : 'card'}`}>
        {isLoading && <div className="spinner-with-background" />}

        <ModalHeading title="Предупреждение" onClickClose={closeModal} />
        <p className="update-cancellation__text">Вы действительно хотите отменить обновление?</p>

        <div className="update-cancellation__buttons mt-8">
          <div onClick={closeModal} className="btn btn--secondary btn--gray mr-4">
            Назад
          </div>
          <div onClick={deleteUpdate} className="btn btn--primary btn--fail">
            Отменить
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
