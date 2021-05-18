import React from 'react';
import Modal from '../utils/modal';
import DatePicker from '../utils/date-picker/date-picker';

const UpdatedDate = ({ setIsDatePicker, isLoading, submitFunctions }) => {
  const { setFieldValue, submitForm } = submitFunctions;

  const submit = (date) => {
    setFieldValue('date', date);
    submitForm();
  };

  return (
    <Modal onClickClose={() => setIsDatePicker(false)}>
      <div className="updated-date card">
        {isLoading && <div className="spinner-with-background" />}
        <h2 className="updated-date__heading heading">Дата обновления</h2>
        <DatePicker submit={submit} cancel={() => setIsDatePicker(false)} className="updated-date__date-picker mt-1" />
      </div>
    </Modal>
  );
};

export default UpdatedDate;
