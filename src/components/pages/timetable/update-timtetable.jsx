import React from 'react';
import UpdateSuccess from './update-success';
import UpdatedDate from './updated-date';
import Modal from '../../base/modal';
import UpdateServicesFromTimetable from '../services/update-services/update-services-from/update-services-from-timtetable';

const UpdateTimtetable = ({ submitFunctions, isLoading, updateTimetableState }) => {
  const [{ servicesCountToUpdate, step }, setUpdateTimetable] = updateTimetableState;

  return (
    <Modal
      isMobileBackground
      onClickClose={() => setUpdateTimetable((state) => ({ ...state, isVisible: false, step: 0 }))}
    >
      {step === 0 && (
        <UpdatedDate
          submitFunctions={submitFunctions}
          isLoading={isLoading}
          setUpdateTimetable={setUpdateTimetable}
        />
      )}
      {step === 1 && (
        <UpdateSuccess
          setUpdateTimetable={setUpdateTimetable}
          servicesCountToUpdate={servicesCountToUpdate}
        />
      )}
      {step === 2 && (
        <UpdateServicesFromTimetable
          close={() => setUpdateTimetable((state) => ({ ...state, isVisible: false, step: 0 }))}
        />
      )}
    </Modal>
  );
};

export default UpdateTimtetable;
