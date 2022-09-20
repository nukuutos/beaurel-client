import React from 'react';
import UpdateSuccess from './update-success';
import UpdatedDate from './updated-date';
import Modal from '../../../../base/modal/modal';
import UpdateServicesFromTimetable from '../../../services/services-updates/update-services/update-services-from/update-services-from-timetable/update-services-from-timetable';

const UpdateModal = ({
  isLoading,
  updateState,
  closeModal,
  goToUpdateServices,
  ...formikProps
}) => {
  const { step } = updateState;

  return (
    <Modal onClickClose={closeModal}>
      {step === 0 && <UpdatedDate {...formikProps} isLoading={isLoading} close={closeModal} />}
      {step === 1 && (
        <UpdateSuccess
          updateState={updateState}
          closeModal={closeModal}
          goToUpdateServices={goToUpdateServices}
        />
      )}
      {step === 2 && <UpdateServicesFromTimetable close={closeModal} />}
    </Modal>
  );
};

export default UpdateModal;
