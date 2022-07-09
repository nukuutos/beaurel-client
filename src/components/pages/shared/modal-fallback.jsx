import React from 'react';
import Modal from '../../base/modal/modal';

const ModalFallback = ({ close }) => (
  <Modal onClickClose={close}>
    <div className="modal-fallback">
      <div className="spinner-with-background" />
    </div>
  </Modal>
);

export default ModalFallback;
