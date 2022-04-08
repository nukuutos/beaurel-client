import { Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../../base/modal/modal';
import City from '../city';
import useHandleSubmit from './use-handle-submit';

const EditCustomerCity = ({ onClickClose }) => {
  const { city } = useSelector((state) => state.timezone);
  const [handleSubmit, isLoading] = useHandleSubmit(onClickClose);

  return (
    <Modal onClickClose={onClickClose}>
      <Formik initialValues={{ city }} onSubmit={handleSubmit}>
        {({ setFieldValue, values, submitForm }) => (
          <City closeCity={submitForm} values={values} setFieldValue={setFieldValue} />
        )}
      </Formik>
    </Modal>
  );
};

export default EditCustomerCity;
