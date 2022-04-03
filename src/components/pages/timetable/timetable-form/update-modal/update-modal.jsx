import React from 'react';
import UpdateSuccess from './update-success';
import UpdatedDate from './updated-date';
import Modal from '../../../../base/modal/modal';
import UpdateServicesFromTimetable from '../../../services/services-updates/update-services/update-services-from/update-services-from-timetable/update-services-from-timetable';

const UpdateModal = ({ isLoading, updateTimetableState, ...formikProps }) => {
  const [{ step }, setUpdateTimetable] = updateTimetableState;

  const closeModal = () => setUpdateTimetable((state) => ({ ...state, isVisible: false, step: 0 }));

  return (
    <Modal onClickClose={closeModal}>
      {step === 0 && <UpdatedDate {...formikProps} isLoading={isLoading} close={closeModal} />}
      {step === 1 && <UpdateSuccess updateTimetableState={updateTimetableState} />}
      {step === 2 && <UpdateServicesFromTimetable close={closeModal} />}
    </Modal>
  );
};

export default UpdateModal;
