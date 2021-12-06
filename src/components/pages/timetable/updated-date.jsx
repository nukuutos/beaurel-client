import React from 'react';
import useMediaQuery from '../../../hooks/use-media-query';
import DatePicker from '../../base/date-picker/date-picker';
import ModalHeading from '../../base/modal/modal-heading';

const UpdatedDate = ({ setUpdateTimetable, isLoading, submitFunctions }) => {
  const { setFieldValue, submitForm } = submitFunctions;
  const isPhone = useMediaQuery(600);

  const submit = (date) => {
    setFieldValue('date', date);
    submitForm();
  };

  return (
    <div className={`updated-date ${isPhone ? 'mt-6' : 'card'}`}>
      {isLoading && <div className="spinner-with-background" />}
      <ModalHeading
        onClickClose={() => setUpdateTimetable((state) => ({ ...state, isVisible: false }))}
        title="Дата обновления"
        titleDesktopClassName="updated-date__heading"
      />
      <DatePicker submit={submit} className="updated-date__date-picker" />
    </div>
  );
};

export default UpdatedDate;
