import React from 'react';
import DatePicker from '../utils/date-picker/date-picker';

const UpdatedDate = ({ setUpdateTimetable, isLoading, submitFunctions }) => {
  const { setFieldValue, submitForm } = submitFunctions;

  const submit = (date) => {
    setFieldValue('date', date);
    submitForm();
  };

  return (
    <div className="updated-date card">
      {isLoading && <div className="spinner-with-background" />}
      <h2 className="updated-date__heading heading">Дата обновления</h2>
      <DatePicker
        submit={submit}
        cancel={() => setUpdateTimetable((state) => ({ ...state, isVisible: false }))}
        className="updated-date__date-picker mt-1"
      />
    </div>
  );
};

export default UpdatedDate;
