import React from 'react';
import { useSelector } from 'react-redux';
import DatePicker from '../../../../base/date-picker/date-picker';
import ModalHeading from '../../../../base/modal/modal-heading';

const UpdatedDate = ({ close, isLoading, setFieldValue, submitForm }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const submit = (date) => {
    setFieldValue('date', date);
    submitForm();
  };

  return (
    <div className={`updated-date ${isPhone ? 'mt-6' : 'card'}`}>
      {isLoading && <div className="spinner-with-background" />}
      <ModalHeading
        onClickClose={close}
        title="Дата обновления"
        titleDesktopClassName="updated-date__heading"
      />
      <DatePicker submit={submit} className="updated-date__date-picker" />
    </div>
  );
};

export default UpdatedDate;
